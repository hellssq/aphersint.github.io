<?php
// Подключение к базе данных (замените данные на свои)
$dbhost = "194.61.53.57";
$dbuser = "root";
$dbpass = "D40fG[S43e+uIh";
$dbname = "users.db";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
  die("Ошибка при подключении к базе данных: " . $conn->connect_error);
}

// Получение данных из POST-запроса
$username = $_POST["username"];
$password = $_POST["password"];

// Запрос к базе данных
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    echo "success"; // Пользователь найден и пароль верный
  } else {
    echo "error"; // Неправильный пароль
  }
} else {
  echo "error"; // Пользователь не найден
}

$conn->close();

?>
