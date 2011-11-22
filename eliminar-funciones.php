<?php
    session_start();
    require('db.php');

    if (isset($_POST['funcion'])){
        header("Content-type: application/json");
        $link = mysql_connect(HOST, USER, PASS);
        if (!$link) {
            echo json_encode(array("error", "sin acceso al server"));
        }
        if (!mysql_select_db(DB, $link)) {
            echo json_encode(array("error", "sin acceso a la base de datos"));
        }

        $sql = "DELETE FROM funciones WHERE idfunciones = '". $_POST['funcion'] ."'";

        if (!mysql_query($sql)) {
            echo json_encode(array("error", "error al eliminar funciones"));
        } else{
            echo json_encode(array($_POST['funcion']));
        }
    }
?>