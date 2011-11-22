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

        $sql = "INSERT INTO funciones (funcion, color, grosor, idUsuario) VALUES ('". $_POST['funcion'] ."', '". $_POST['color'] ."', '". $_POST['grosor'] ."', '". $_SESSION['id'] ."')";

        if (!mysql_query($sql)) {
            echo json_encode(array("error", "error al insertar la funcion"));
        } else{
            echo json_encode(array(mysql_insert_id(), $_POST['funcion'], $_POST['color'], $_POST['grosor']));
        }
    }
?>