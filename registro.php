<?php
    session_start();
    require('db.php');

    if (isset($_POST['usuario'])){
        header("Content-type: application/json");
        $link = mysql_connect(HOST, USER, PASS);
        if (!$link) {
            echo json_encode(array("error", "sin acceso al server"));
        }
        if (!mysql_select_db(DB, $link)) {
            echo json_encode(array("error", "sin acceso a la base de datos"));
        }
        //$sql = "INSERT INTO usuario (email, pass, passv) VALUES ('pahk, 'xD)";
        $sql = "INSERT INTO usuario (email, pass) VALUES ('". $_POST['usuario'] ."', '". md5($_POST['pass']) ."')";

        if (!mysql_query($sql)) {
            echo json_encode(array("error", "error al insertar el usuario"));
        } else{
            $_SESSION['usuario'] = $_POST['usuario'];
            $_SESSION['id'] = mysql_insert_id();
            echo json_encode(array("error", ""));
        }
    }
?>