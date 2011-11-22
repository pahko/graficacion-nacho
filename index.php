<?php session_start(); require('db.php');?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="colorpicker/js/colorpicker.js"></script>
		<script type="text/javascript" src="js/jquery-ui.custom.min.js"></script>
		<script type="text/javascript" src="js/Concurrent.Thread.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
		<link rel="stylesheet" type="text/css" href="css/reset.css"/>
		<link rel="stylesheet" type="text/css" href="colorpicker/css/colorpicker.css"/>
		<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.8.16.custom.css"/>
		<link rel="stylesheet" type="text/css" href="css/style.css"/>
	</head>
	<body>
	<div id="wrapper">
		<div id="header"><center><h1>Graficador de funciones</h1></center></div>
		<div id="puerto-vision">
			<ul>
				<li><a href="#canvas">Puerto de vision</a></li>
				<li><a href="#usuario">Usuario</a></li>
			</ul>
			<div id="canvas">
				<canvas id="micanvas" width="800" height="600">No es compatible</canvas>
			</div>
			<div id="usuario">
				<?php
					if (isset($_SESSION['usuario'])){
				?>
				<h2>Bienvenido <?php echo $_SESSION['usuario']; ?></h2>
				<br />
				<div id="funciones-lista">
					<?php
						$link = mysql_connect(HOST, USER, PASS);
				        mysql_select_db(DB, $link);
				        $sql = "SELECT * FROM funciones WHERE idusuario = '". $_SESSION['id'] ."'";

				        $res = mysql_query($sql);

				        while ($row = mysql_fetch_array($res)){
					?>
						<div>
							<b>Funcion: </b> <?php echo $row['funcion']; ?> <b> Color: </b>
							<?php echo $row['color']; ?> <b> Grosor: </b> <?php echo $row['grosor'] ?>
							<input type="checkbox" value="<?php echo $row['idfunciones'].'.....'.$row['funcion'].'.....'.$row['color'].'.....'.$row['grosor']; ?>" /></div>
					<?php
					}
					?>
				</div>
				<br />
				<button id="logout">Cerrar Sesión</button>
				<?php
					}else{
				?>
				<div id="registrodiv">
					<form id="registro" method="post" accept-charset="utf-8">
						<div class="field" id="errores-reg">
						</div>
						<div class="field">
							<label>Email:</label>
							<input type="text" id="emailR" name="email" size="35">
						</div>
						<div class="field">
							<label>Contraseña:</label>
							<input type="password" id="passR" name="pass" size="29">
						</div>
						<div class="field">
							<label>Verificar Contraseña:</label>
							<input type="password" id="passR2" name="pass2">
						</div>
					</form>
					<div class="field">
						<button id="registrarse">Registrarse</button>
						<button id="login">Iniciar Sesión</button>
					</div>
				</div><!-- registro -->
				<?php
					}
				?>
			</div><!-- usuario -->
		</div>
		<div id="panel">
			<ul>
				<li><a href="#controles">Controles</a></li>
				<li><a href="#funciones">Funciones</a></li>
			</ul>
			<div id="controles">
				<dl>
						<dt><label for="funcion">Funcion:</label></dt>
						<dd><input id="funcion" name="funcion" type="text" value="Math.pow(x,2)"/></dd>
				</dl>
				<dl>
						<dt>
							<label for="funcion">Color:</label>
							<input type="text" id="colorpicker" size="1" value="000"/>
							<label for="funcion">Ancho:</label>
							<input type="text" id="ancho" size="1" value="1"/>
						</dt>
				</dl>
				<dl>
						<dt>
							<button id="dibujar">Graficar</button>
							<button id="borrar">Borrar</button>
						</dt>

				</dl>
				<dl>
						<dt><div id="slider"></div></dt><br />
						<dd><label>Zoom:  	</label><input readonly type="text" size="3" id="zoom"/></dd>


				</dl>
				<!--dl>
						<dt>
							<label>Zoom:  	</label><button name="zoomin" id="zoomin">+</button>
							<button id="zoomout">-</button>
						</dt>

				</dl-->
				<dl>
					<button id="limpiar">Limpiar</button>
					<?php
						if (isset($_SESSION['usuario'])){
					?>
					<button id="guardar-funciones">Guardar Funciones</button>
					<button id="graficar-funciones">Dibujar Funciones Guardadas</button>
					<button id="eliminar-funciones">Eliminar Funciones Guardadas</button>
					<br />
					<?php
					}
					?>
				</dl>
			</div>
			<div id="funciones">
				<dl>
						<dt>
							<button id="x">X<sup> </sup></button>
							<button id="x2">X<sup>2</sup></button>
							<button id="x3">X<sup>3</sup></button>
						</dt>
				</dl>
				<dl>
						<dt>
							<button id="x4">X<sup>4</sup></button>
							<button id="x5">X<sup>5</sup></button>
							<button id="x6">X<sup>6</sup></button>
						</dt>
				</dl>
				<dl>
						<dt>
							<button id="sin">sen(x)</button>
							<button id="cos">cos(x)</button>
						</dt>
				</dl>
				<dl>
						<dt>
							<button id="sec">sec(x)</button>
							<button id="csc">csc(x)</button>
						</dt>
				</dl>
				<dl>
						<dt>
							<button id="tan">tan(x)</button>
							<button id="atan">atan(x)</button>
						</dt>
				</dl>
			</div>
		</div>
		<div id="actual">
			<ul>
				<li><a href="#actualmente">Actualmente</a></li>
				<li><a href="#acerca">Acerca de...</a></li>
			</ul>
			<div id="actualmente">
				<div id="lista"></div>
			</div>
			<div id="acerca">
				<div id="autor">
					<h2>Desarrollado por:</h2><br />
					<h3>Albarrán Cristobal<h3><br />
					<h3>Jesus Salvador Meza Sanchez<h3><br />
					<h3>Fernando Hernandez Argueta<h3><br />

				</div>
			</div>
		</div>
	</div><!--FIN WRAPPER-->


	</body>
</html>
