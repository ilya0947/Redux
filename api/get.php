<?php
$data = json_decode(file_get_contents('./db.json'), true);

echo json_encode($data);

?>