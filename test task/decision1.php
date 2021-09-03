<?php

$order = array(
	"name" => "Тест тест",
	"phone" => "+79111111111",
	"webmaster_id" => 65,
	"id" => 123456,
	"offer" => "200",
	"ip" => "1.1.1.1"
);

send( $order['webmaster_id'], $order["id"], "wm", "name", $order["name"], "json");

function send( $id, $key, $app, $func, $data, $format ) {
	
        //Инициализирует сеанс
        $connection = curl_init();
        //Устанавливаем адрес для подключения
        $url = 'https://toproi.biz/api/' . $app . '/' . $func . '.' . $format . '?id=' . $id . '-' . $key;
        curl_setopt($connection, CURLOPT_URL, $url);
        //Указываем, что мы будем вызывать методом POST
        curl_setopt($connection, CURLOPT_POST, 1);
        //Передаем параметры методом POST
        curl_setopt($connection, CURLOPT_POSTFIELDS, $data);
        //Говорим, что нам необходим результат
        curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);
        //Выполняем запрос с сохранением результата в переменную
        $result=curl_exec($connection);
        //Завершает сеанс
        curl_close($connection);
        //Выводим на экран
    
        switch ( $format ) {
            case 'raw':     echo "Результат<br>".$result;
            case 'json':    echo "Результат<br>".json_decode( $result, true );
            case 'text':    parse_str( $result, $a ); return "Результат<br>".$a;
            default:        echo "Результат<br>".unserialize( $result );
        }
    }
?> 