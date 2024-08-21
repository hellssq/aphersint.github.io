<?php
header('Content-Type: application/json');

// Подключение к базе данных SQLite
try {
    $pdo = new PDO('sqlite:users.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Cannot connect to the database.']);
    exit();
}

// Получаем данные из запроса
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Проверяем данные
if (!empty($username) && !empty($password)) {
    // Подготавливаем и выполняем SQL-запрос
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username LIMIT 1');
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Please enter both username and password.']);
}
?>
