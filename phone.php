<?php
header('Content-Type: application/json');

// Функция для чтения данных из CSV-файла
function readCsv($filePath) {
    $data = [];
    if (($handle = fopen($filePath, 'r')) !== FALSE) {
        $header = fgetcsv($handle); // Пропускаем заголовки
        while (($row = fgetcsv($handle)) !== FALSE) {
            $data[] = array_combine($header, $row);
        }
        fclose($handle);
    }
    return $data;
}

// Загрузка данных из всех CSV-файлов
$data1 = readCsv("subs.csv");

// Объединение всех данных в один массив
$data = array_merge($data1);

// Получение номера телефона из параметров запроса
$phone = isset($_GET['phone']) ? $_GET['phone'] : '';

if (!empty($phone)) {
    // Фильтрация данных по номеру телефона
    $filteredData = array_filter($data, function($item) use ($phone) {
        return isset($item['phone']) && $item['phone'] == $phone;
    });

    echo json_encode(array_values($filteredData));
} else {
    echo json_encode(['error' => 'No phone provided']);
}
?>
