<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$_POST = json_decode(file_get_contents('php://input'), true);
$base = json_decode(file_get_contents('./dbCart.json'), true);

if (is_array($_POST)) {
    array_push($base['total'], $_POST);
    
    file_put_contents('./dbCart.json', json_encode($base), LOCK_EX);

}


echo json_encode($base);
// echo json_encode($total);



?>