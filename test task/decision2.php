<?php

$order = array(
	"name" => "Тест тест",
	"phone" => "+79111111111",
	"webmaster_id" => 65,
	"id" => 123456,
	"offer" => "200",
	"ip" => "1.1.1.1"
);

send($order);

function send($data) {
	header('Content-type: application/json');
    echo json_encode($data);
}
?>