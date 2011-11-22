/*
 *declaracion de variables globales
 */
var canvas;
var contexto;
var funciones = []
var funciones2 = []
var porcentaje = 10000
var resolucion = 100 / porcentaje

function borrar(){
	/*
	 *Funcion que borra el contenido del puerto de vision(canvas)
	 */
	contexto.fillStyle = '#ffffff';
	contexto.fillRect(0, 0, 800, 600)
}

function dibujar_ejes(){
	/*
	 *Funcion que dibuja los ejes y las escalas
	 */
	borrar()
	contexto.fillStyle = '#00f';
	contexto.strokeStyle = '#00f';
	contexto.lineWidth = 1
	contexto.beginPath()
	contexto.moveTo(0, 300)
	contexto.lineTo(800, 300)
	contexto.moveTo(400, 0)
	contexto.lineTo(400, 600)

	var x=porcentaje/100

	for(var i = 0; i<10; i++){
	var x=porcentaje/100
	x*=i
	var y = porcentaje/10000*15

	contexto.moveTo(x + 400, 300 - y)
	contexto.lineTo(x + 400, 300 + y)

	contexto.moveTo(400 - x, 300 - y)
	contexto.lineTo(400 - x, 300 + y)

	contexto.moveTo(400 - y, 300 - x)
	contexto.lineTo(400 + y, 300 - x)

	contexto.moveTo(400 - y, 300 + x)
	contexto.lineTo(400 + y, 300 + x)
	}

	contexto.fill()
	contexto.stroke()
	contexto.closePath()
}

function dibuja(lista){
	/*
	 *Funcion que dibuja las funciones
	 */
	var relacion = porcentaje/100
	for(var i=0; i<lista.length;i++){
		var e=lista[i]

		contexto.strokeStyle = e[1];
		contexto.beginPath()
		contexto.lineWidth = e[2]
		console.log("sigue trabajando " + i);
		for(var x = -400; x < 400; x += resolucion){

			x1 = x*relacion + 400
			y1 = 300 - eval(e[0])*relacion

			x2 = x1 + resolucion
			y2 = 300 - eval(e[0].replace('x', '(x+'+resolucion+')'))*relacion

			contexto.moveTo(x1, y1)
			contexto.lineTo(x2, y2)

		}
		contexto.stroke();
		contexto.closePath();
	}
}

function lista(funciones){
	/*
	 *Funcion inserta en Actualmente las funciones que se encuentran graficadas
	 */
	$('#lista').html('');
	for (var i=0;i<funciones.length;i++){
		$('#lista').append('<label>'+funciones[i]+'</label><br />')
	}
	$('.color').each(function(){
		$(this).css('background',"#"+$(this).val());
		$(this).css('color',"#"+$(this).val());
	});

}

$(function(){
	/*
	 *Asigancion de eventos a los botones
	 */
	$('#puerto-vision,#panel,#actual').tabs();
	$('button').button();
	$('#colorpicker').css('background',"#"+$('#colorpicker').val());
	$('#colorpicker').css('color',"#"+$('#colorpicker').val())
	$( "#slider" ).slider({
		range: "min",
		value: 100,
		min: 10,
		max: 250,
		stop: function( event, ui ) {
			$( "#zoom" ).val(ui.value+'%');
			porcentaje=ui.value*100;
			resolucion = 100 / porcentaje
			dibujar_ejes()
			dibuja(funciones)
		},
		slide: function( event, ui ) {
				$( "#zoom" ).val(ui.value+'%');
			}
	});
	$( "#zoom" ).val($( "#slider" ).slider( "value" )+'%' );
	$('#x').click(function(){
		$('#funcion').val('').val('x');
		$('#dibujar').click();
	});
	$('#x2').click(function(){
		$('#funcion').val('').val('Math.pow(x,2)');
		$('#dibujar').click();
	});
	$('#x3').click(function(){
		$('#funcion').val('').val('Math.pow(x,3)');
		$('#dibujar').click();
	});
	$('#x4').click(function(){
		$('#funcion').val('').val('Math.pow(x,4)');
		$('#dibujar').click();
	});
	$('#x5').click(function(){
		$('#funcion').val('').val('Math.pow(x,5)');
		$('#dibujar').click();
	});
	$('#x6').click(function(){
		$('#funcion').val('').val('Math.pow(x,6)');
		$('#dibujar').click();
	});
	$('#sin').click(function(){
		$('#funcion').val('').val('Math.sin(x)');
		$('#dibujar').click();
	});
	$('#cos').click(function(){
		$('#funcion').val('').val('Math.cos(x)');
		$('#dibujar').click();
	});
	$('#sec').click(function(){
		$('#funcion').val('').val('Math.pow(x,6)');
		$('#dibujar').click();
	});
	$('#csc').click(function(){
		$('#funcion').val('').val('Math.pow(x,6)');
		$('#dibujar').click();
	});
	$('#tan').click(function(){
		$('#funcion').val('').val('Math.tan(x)');
		$('#dibujar').click();
	});
	$('#atan').click(function(){
		$('#funcion').val('').val('1/Math.tan(x)');
		$('#dibujar').click();
	});


	/*
	 *Creacion del puerto de vision (canvas)
	 */
	canvas = $('#micanvas')[0]
	contexto = canvas.getContext('2d')
	contexto.fillStyle = '#ffffff';
	contexto.fillRect(0, 0, 800, 600)

	contexto.fill();
	contexto.stroke();
	contexto.closePath();

	/*
	 *Asigancion de eventos a los botones
	 */
	$('#borrar').click(dibujar_ejes).click()

	$('#dibujar').click(function(){
		funciones.push([$('#funcion').val(), '#' + $('#colorpicker').val(), +$('#ancho').val()])
		funciones2.push([$('#funcion').val() +"-"+ "<input class='color' type='text' size='1' value="+$('#colorpicker').val()+">" +"-"+ $('#ancho').val()])

		Concurrent.Thread.create(dibuja, funciones);
		Concurrent.Thread.create(lista, funciones2);

		//dibuja(funciones)
		//lista(funciones2)
	});

	$('#colorpicker').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val(hex);
			$(el).ColorPickerHide();
			$('#colorpicker').css('background',"#"+$('#colorpicker').val());
			$('#colorpicker').css('color',"#"+$('#colorpicker').val());


		},
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});

	$('#zoomin').click(function(){
		porcentaje += 1000
		resolucion = 100 / porcentaje
		dibujar_ejes()
		dibuja(funciones)
	});

	$('#zoomout').click(function(){
		porcentaje -= 1000
		resolucion = 100 / porcentaje
		dibujar_ejes()
		dibuja(funciones)
	});

	$('#limpiar').click(function(){
		funciones = [];
		funciones2 = [];
		$("#lista").html('');
		dibujar_ejes();
	});

	$("#registrarse").click(function(){
		$("#errores-reg").html('');
		if ($.trim($("#emailR").val()).length >= 4 && $.trim($("#passR").val()).length >= 4 && $.trim($("#passR2").val()).length >= 4){
			if (/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test($("#emailR").val())) {
				if ($("#passR").val() == $("#passR2").val()) {
					$.ajax({
						data: "usuario=" + $("#emailR").val() + "&pass=" + $("#passR").val() + "&pass2=" + $("#passR2").val(),
						type: "POST",
						dataType: "json",
						url: "registro.php",
						success: function(data){
							if (data != null)
								if (data[1].length == 0){
									$("#registrodiv").hide('slow');
									location.href = "index.php#usuario";
									location.reload(true);
								}else{
									$("#errores-reg").html(data[1]);
								}
						}
					});
				} else {
					$("#errores-reg").html('Las contraseñas no coinciden');
				}
			} else {
				$("#errores-reg").html('El email no es valido');
			}
		} else {
			$("#errores-reg").html('Todos los campos son necesarios');
		}
	});

	$("#login").click(function(){
		$("#errores-reg").html('');
		$.ajax({
			data: "usuario=" + $("#emailR").val() + "&pass=" + $("#passR").val(),
			type: "POST",
			dataType: "json",
			url: "login.php",
			success: function(data){
				if (data != null){
					if (data[1].length == 0){
						$("#registrodiv").hide('slow');
						location.href = "index.php#usuario";
						location.reload(true);
					}else{
						$("#errores-reg").html(data[1]);
					}
				}
			}
		});
	});

	$("#logout").click(function(){
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "logout.php",
			success: function(data){
				location.href = "index.php#usuario";
				location.reload(true);
			}
		});
	});

	$("#guardar-funciones").click(function(){
		for(var i=0; i<funciones.length; i++) {
			$.ajax({
				data: "funcion=" + funciones[i][0] + "&color=" + funciones[i][1] + "&grosor=" + funciones[i][2],
				type: "POST",
				dataType: "json",
				url: "insertar-funciones.php",
				success: function(data){
					$("#funciones-lista").append("<div><b>Funcion:</b> " + data[1] + " <b>Color:</b> " + data[2] +
						" <b>Grosor:</b> " + data[3] + " <input type='checkbox' value='" + data[0] + "....." +
						data[1]	+ "....." + data[2] + "....." + data[3] + "' /></div>");
				}
			});
		}
	});

	$("#graficar-funciones").click(function(){
		var func = [];
		var func2 = [];

		$("input:checkbox:checked").each(function(i, as){
			func.push([as.value.split(".....")[1], as.value.split(".....")[2], as.value.split(".....")[3]]);
			func2.push([as.value.split(".....")[1] + "-" + "<input class='color' type='text' size='1' value="+ 
				as.value.split(".....")[2].substring(1) +">" +"-"+ as.value.split(".....")[3]]);
		});
		console.log(func);
		console.log(func2);
		dibujar_ejes();
		Concurrent.Thread.create(dibuja, func);
		Concurrent.Thread.create(lista, func2);
	});

	$("#eliminar-funciones").click(function(){
		$("input:checkbox:checked").each(function(i, as){
			$.ajax({
				data: "funcion=" + as.value.split(".....")[0],
				type: "POST",
				dataType: "json",
				url: "eliminar-funciones.php",
				success: function(data){
				}
			});
		});
		$("input:checkbox:checked").parent().remove();
	});
})