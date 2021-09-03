<?php
include 'connect_db.php';//Соединение с БД
 
 $query = $mysqli->query("SELECT * FROM `professions`");

 $listProf = '';
 $listProf .= '<select class="add-employee__input">';

 while($row = $query->fetch_assoc()) {
    $listProf .= '<option value='.$row['p_id'].'>'.$row['name'].'</option>';
}

$listProf .= '</select>';

$query->free();
$mysqli->close();
