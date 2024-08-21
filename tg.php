<?php
header('Content-Type: application/json');

ini_set('memory_limit', '-1');

if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    $data = [];


    if (($handle = fopen("data.csv", "r")) !== FALSE) {
        $header = fgetcsv($handle);
        while (($row = fgetcsv($handle)) !== FALSE) {
            if (count($row) === count($header)) {
                $data[] = array_combine($header, $row);
            }
        }
        fclose($handle);
    }

    $filteredData = array_filter($data, function($item) use ($userId) {
        return $item['id'] == $userId;
    });

    echo json_encode(array_values($filteredData));
} else {
    echo json_encode(['error' => 'No id provided']);
}
?>