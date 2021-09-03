<?php

if(isset($_GET['method'])) {
    include "connect_db.php";//Соединение с БД
    $method = $_GET['method'];
    
    //Выборка и вставка в БД
    switch($method) {
        //Выбирает всех сотрудников
        case 'default':
        $query = $mysqli->query("SELECT workers.w_id, workers.name, workers.surname, workers.link_to_the_photo, professions.name AS position, paymant.salary, paymant.bonus, paymant.date FROM workers LEFT JOIN professions ON workers.position = professions.p_id LEFT JOIN paymant ON workers.w_id = paymant.w_id");

        while($row = $query->fetch_object()) {
            $result[] = $row;
        }

        echo json_encode(array('employees' => $result));
        break;

        //Выбирает сотрудников по дате заработной плате
        case 'getDateBydate': 
        $date = $_GET['date'];

        $query = $mysqli->query("SELECT workers.w_id, workers.name, workers.surname, workers.link_to_the_photo, professions.name AS position, paymant.salary, paymant.bonus, paymant.date FROM workers INNER JOIN professions ON workers.position = professions.p_id INNER JOIN paymant ON workers.w_id = paymant.w_id WHERE paymant.date = '$date'");

        while($row = $query->fetch_object()) {
            $result[] = $row;
        }

        echo json_encode(array('employees' => $result));
        break;

        //Сохраняет новых сотрудников
        case 'saveEmployee':
        $name = $_GET['name'];
        $surname = $_GET['surname'];
        $position = $_GET['position'];
        $img = 'img1.jpg';

        $save = $mysqli->query("INSERT INTO `workers`(`name`, `surname`, `position`, `link_to_the_photo`) VALUES('$name', '$surname', '$position', '$img')");

        if ($save) {
            echo "Новый сотрудник успешно добавлен!";
        } else {
            echo "Не удалось добавить!";
        }
    }

    $mysqli->close();
}
