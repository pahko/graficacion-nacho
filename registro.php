<?php
    $registro = array("error", "d");

    if ($_POST['usuario']){
        header("Content-type: application/json");
        echo json_encode($registro);
    }
?>