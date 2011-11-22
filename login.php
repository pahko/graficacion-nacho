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
        $sql = "SELECT * FROM usuario where email = '". $_POST['usuario'] ."' and pass = '". md5($_POST['pass']) ."'";
        $res = mysql_query($sql);
        if ($row = mysql_fetch_row($res)){
            $_SESSION['usuario'] = $_POST['usuario'];
            echo json_encode(array("error", ""));
        } else {
            echo json_encode(array("error", "error al buscar el usuario"));
        }
    }
?>