

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
VISUALIZAR LA CESTA DEL CARRITO DE COMPRAS
=============================================*/

if(localStorage.getItem("cantidadCesta") != null){

	$(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
	$(".sumaCesta").html(localStorage.getItem("sumaCesta"));

}else{

	$(".cantidadCesta").html("0");
	$(".sumaCesta").html("0");
}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
VISUALIZAR LOS PRODUCTOS EN LA PÁGINA CARRITO DE COMPRAS
=============================================*/


if(localStorage.getItem("listaProductos") != null){

	var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

}else{

	$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras.</div>');
	$(".sumaCarrito").hide();
	$(".cabeceraCheckout").hide();
}

/*=============================================
============================================================================================= 
============================================================================================= 
============================================================================================= 
░C░O░N░F░I░R░M░A░R░ ░P░Á░G░I░N░A░ ░D░E░ ░C░A░R░R░I░T░O░ ░D░E░ ░C░O░M░P░R░A░S░
============================================================================================= 
============================================================================================= 
============================================================================================= 
Este código:
Detecta si estás en la página del carrito.
Toma los productos guardados localmente (listaCarrito).
Consulta al servidor los precios reales.
Genera dinámicamente el contenido del carrito en HTML.
Controla cantidades, calcula subtotales, y actualiza el total del carrito.
=============================================*/

var url = window.location.href;//obtiene la url completa del navegador
var indice = url.split("/");//split("/")divide la url por / y crea una array con cada parte de la url

/**
 * Recorre el array indice y si encuentra la palabra "carrito-de-compras", ejecuta el contenido del bloque
 * (esto asegura que el código solo se ejecute en esa página).
 */
for(var i = 0; i < indice.length; i++){
	if(indice[i] == "carrito-de-compras"){
/**============================================================================================= 
*============================================================================================= 
*============================================================================================= 
*/
		listaCarrito.forEach(funcionForEach);//
		/**listaCarrito es un arreglo de productos (probablemente en localStorage o una variable global).
		Ejecuta la función funcionForEach para cada producto.
		*/
		function funcionForEach(item, index){//item: cada producto, index: su posicion del array
			var datosProducto = new FormData();//a: Prepara los datos para solicitar información adicional del producto:
			var precio = 0;
			datosProducto.append("id", item.idProducto);
			datosProducto.append("precio", item.precio);
			// console.log(item.idProducto, item.precio);
			// let productosArray = [];
			// listaCarrito.forEach(function(item) {
			// 	productosArray.push({
			// 		id: item.idProducto,
			// 		precio: item.precio
			// 	});
			// });
			// // Luego imprimirlos uno a uno
			//datosProducto.append("productos", JSON.stringify(productosArray));
			// productosArray.forEach(function(item) {
			// console.log("ID:", item.id, "- Precio:", item.precio);
			// });

			// datosProducto[item.idProducto, item.precio];
			$.ajax({//b) Hace una solicitud AJAX al servidor para obtener el precio actualizado:
				//Envia el idProducto al backend para obtener información como precio y precioOferta.
				url:rutaOculta+"ajax/producto.ajax.php",
				method:"POST",
				data:  datosProducto,
				cache: false,
				contentType: false,
				processData:false,
				dataType: "json",
				success: function(respuesta){
					//Usa el precio de oferta si existe, si no, el precio normal.
					if(respuesta["precioOferta"] == 0){
						precio = respuesta["precio"];
					}else{
						precio = respuesta["precioOferta"];
					}

					/**Crea un bloque de HTML con los datos del producto: imagen, nombre, precio, cantidad, subtotal, botón para eliminar.
					 * Calcula el subtotal:
					 */
					$(".cuerpoCarrito").append(
						'<div clas="row itemCarrito">'+
							'<div class="col-sm-1 col-xs-12">'+
								'<br>'+
								'<center>'+
									'<button class="btn btn-default backColor quitarItemCarrito" idProducto="'+item.idProducto+'" peso="'+item.peso+'">'+
										'<i class="fa fa-times"></i>'+
									'</button>'+
								'</center>'+	
							'</div>'+
							'<div class="col-sm-1 col-xs-12">'+
								'<figure>'+
									'<img src="'+item.imagen+'" class="img-thumbnail">'+
								'</figure>'+
							'</div>'+
							'<div class="col-sm-4 col-xs-12">'+
								'<br>'+
								'<p class="tituloCarritoCompra text-left">'+item.titulo+'</p>'+
							'</div>'+
							'<div class="col-md-2 col-sm-1 col-xs-12">'+
								'<br>'+
								'<p class="precioCarritoCompra text-center">S/. <span>'+precio+'</span></p>'+
							'</div>'+
							'<div class="col-md-2 col-sm-3 col-xs-8">'+
								'<br>'+	
								'<div class="col-xs-8">'+
									'<center>'+
										'<input type="number" class="form-control cantidadItem" min="1" value="'+item.cantidad+'" tipo="'+item.tipo+'" precio="'+precio+'" idProducto="'+item.idProducto+'" item="'+index+'">'+	
									'</center>'+
								'</div>'+
							'</div>'+
							'<div class="col-md-2 col-sm-1 col-xs-4 text-center">'+
								'<br>'+
								'<p class="subTotal'+index+' subtotales">'+
									'<strong>S/.<span>'+(Number(item.cantidad)*Number(precio))+'</span></strong>'+
								'</p>'+
							'</div>'+
						'</div>'+
						'<div class="clearfix"></div>'+
						'<hr>');
					/*=============================================
					EVITAR MANIPULAR LA CANTIDAD EN PRODUCTOS VIRTUALES
					=============================================*/
					//Los productos de tipo virtual no permiten modificar su cantidad.
					$(".cantidadItem[tipo='virtual']").attr("readonly","true");
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// ACTUALIZAR SUBTOTAL
					// =============================================*/

					/**
					 * cestaCarrito() y sumaSubtotales() probablemente:
					 * actualizan el total general del carrito.
					 * actualizan algún contador visual del carrito (por ejemplo en el ícono del menú).
					 */
					var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");
					cestaCarrito(precioCarritoCompra.length);
					sumaSubtotales();		
				}
			})	
		}		
	}
}




// $.ajax({
//     url: 'tu_script.php',        // Cambia por la ruta de tu archivo PHP
//     method: 'POST',
//     contentType: 'application/json', // Indica que estás enviando JSON
//     data: JSON.stringify({ productos: productosArray }), // Enviar el array
//     success: function(respuesta) {
//         console.log("Respuesta del servidor:", respuesta);
//     },
//     error: function(error) {
//         console.error("Error al enviar:", error);
//     }
// });

$(document).ready(function(){

  // Cuando se abre el modal
  $("#btnCheckout").on("click", function(){
    const usuario = $(this).data("usuario");
    const titulo = $(this).data("titulo");
    const precio = $(this).data("precio");

    // Mostrar en el modal
    $("#checkoutTitulo").text(titulo);
    $("#checkoutPrecio").text(precio);

    // Guardar en inputs ocultos para enviar por AJAX
    $("#inputUsuario").val(usuario);
    $("#inputTitulo").val(titulo);
    $("#inputPrecio").val(precio);
  });

  // Enviar por AJAX
  $("#btnConfirmarPago").on("click", function(){

    const datos = {
      usuario: $("#inputUsuario").val(),
      titulo: $("#inputTitulo").val(),
      precio: $("#inputPrecio").val()
    };

    $.ajax({
      url: "ajax/carrito.ajax.php",
      method: "POST",
      data: datos,
      success: function(respuesta){
        alert("Respuesta del servidor: " + respuesta);
        // Puedes redirigir o mostrar mensaje de éxito aquí
      },
      error: function(){
        alert("Error al procesar el pago.");
      }
    });
  });

});



/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
AGREGAR AL CARRITO
=============================================*/

$(".agregarCarrito").click(function(){

	var idProducto = $(this).attr("idProducto");
	var imagen = $(this).attr("imagen");
	var titulo = $(this).attr("titulo");
	var precio = $(this).attr("precio");
	var tipo = $(this).attr("tipo");
	var peso = $(this).attr("peso");

	var agregarAlCarrito = false;

	/*=============================================
	CAPTURAR DETALLES
	=============================================*/

	if(tipo == "virtual"){

		agregarAlCarrito = true;

	}else{

		var seleccionarDetalle = $(".seleccionarDetalle");
		
		for(var i = 0; i < seleccionarDetalle.length; i++){

			if($(seleccionarDetalle[i]).val() == ""){

				swal({
					  title: "Debe seleccionar Color",
					  text: "",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡Seleccionar!",
					  closeOnConfirm: false
					})

				return;

			}else{

				titulo = titulo + "-" + $(seleccionarDetalle[i]).val();

				agregarAlCarrito = true;

			}

		}		

	}

	/*=============================================
	ALMACENAR EN EL LOCALSTARGE LOS PRODUCTOS AGREGADOS AL CARRITO
	=============================================*/

	if(agregarAlCarrito){

		/*=============================================
		RECUPERAR ALMACENAMIENTO DEL LOCALSTORAGE
		=============================================*/

		if(localStorage.getItem("listaProductos") == null){

			listaCarrito = [];

		}else{

			var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

			for(var i = 0; i < listaProductos.length; i++){

				if(listaProductos[i]["idProducto"] == idProducto && listaProductos[i]["tipo"] == "virtual"){

					swal({
					  title: "El producto ya está agregado al carrito de compras",
					  text: "",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡Volver!",
					  closeOnConfirm: false
					})

					return;

				}

			}

			listaCarrito.concat(localStorage.getItem("listaProductos"));

		}

		listaCarrito.push({"idProducto":idProducto,
						   "imagen":imagen,
						   "titulo":titulo,
						   "precio":precio,
					       "tipo":tipo,
				           "peso":peso,
				           "cantidad":"1"});

		localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

		/*=============================================
		ACTUALIZAR LA CESTA
		=============================================*/

		var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
		var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

		$(".cantidadCesta").html(cantidadCesta);
		$(".sumaCesta").html(sumaCesta);

		localStorage.setItem("cantidadCesta", cantidadCesta);
		localStorage.setItem("sumaCesta", sumaCesta);
		
		/*=============================================
		MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO
		=============================================*/

		swal({
			  title: "",
			  text: "¡Se ha agregado un nuevo producto al carrito de compras!",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  cancelButtonText: "¡Continuar comprando!",
			  confirmButtonText: "¡Ir a mi carrito de compras!",
			  closeOnConfirm: false
			},
			function(isConfirm){
				if (isConfirm) {	   
					 window.location = rutaOculta+"carrito-de-compras";
				} 
		}
	);
	}

})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
QUITAR PRODUCTOS DEL CARRITO
=============================================*/

$(document).on("click", ".quitarItemCarrito", function(){

	$(this).parent().parent().parent().remove();

	var idProducto = $(".cuerpoCarrito button");
	var imagen = $(".cuerpoCarrito img");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var precio = $(".cuerpoCarrito .precioCarritoCompra span");
	var cantidad = $(".cuerpoCarrito .cantidadItem");

	/*=============================================
	SI AÚN QUEDAN PRODUCTOS VOLVERLOS AGREGAR AL CARRITO (LOCALSTORAGE)
	=============================================*/

	listaCarrito = [];

	if(idProducto.length != 0){

		for(var i = 0; i < idProducto.length; i++){

			var idProductoArray = $(idProducto[i]).attr("idProducto");
			var imagenArray = $(imagen[i]).attr("src");
			var tituloArray = $(titulo[i]).html();
			var precioArray = $(precio[i]).html();
			var pesoArray = $(idProducto[i]).attr("peso");
			var tipoArray = $(cantidad[i]).attr("tipo");
			var cantidadArray = $(cantidad[i]).val();

			listaCarrito.push({"idProducto":idProductoArray,
						   "imagen":imagenArray,
						   "titulo":tituloArray,
						   "precio":precioArray,
					       "tipo":tipoArray,
				           "peso":pesoArray,
				           "cantidad":cantidadArray});

		}

		localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

		sumaSubtotales();
		cestaCarrito(listaCarrito.length);


	}else{

		/*=============================================
		SI YA NO QUEDAN PRODUCTOS HAY QUE REMOVER TODO
		=============================================*/	

		localStorage.removeItem("listaProductos");

		localStorage.setItem("cantidadCesta","0");
		
		localStorage.setItem("sumaCesta","0");

		$(".cantidadCesta").html("0");
		$(".sumaCesta").html("0");

		$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras.</div>');
		$(".sumaCarrito").hide();
		$(".cabeceraCheckout").hide();

	}

})


/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
GENERAR SUBTOTAL DESPUES DE CAMBIAR CANTIDAD
=============================================*/
$(document).on("change", ".cantidadItem", function(){

	var cantidad = $(this).val();
	var precio = $(this).attr("precio");
	var idProducto = $(this).attr("idProducto");
	var item = $(this).attr("item");

	$(".subTotal"+item).html('<strong>S/. <span>'+(cantidad*precio)+'</span></strong>');

	/*=============================================
	ACTUALIZAR LA CANTIDAD EN EL LOCALSTORAGE
	=============================================*/

	var idProducto = $(".cuerpoCarrito button");
	var imagen = $(".cuerpoCarrito img");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var precio = $(".cuerpoCarrito .precioCarritoCompra span");
	var cantidad = $(".cuerpoCarrito .cantidadItem");

	listaCarrito = [];

	for(var i = 0; i < idProducto.length; i++){

			var idProductoArray = $(idProducto[i]).attr("idProducto");
			var imagenArray = $(imagen[i]).attr("src");
			var tituloArray = $(titulo[i]).html();
			var precioArray = $(precio[i]).html();
			var pesoArray = $(idProducto[i]).attr("peso");
			var tipoArray = $(cantidad[i]).attr("tipo");
			var cantidadArray = $(cantidad[i]).val();

			listaCarrito.push({"idProducto":idProductoArray,
						   "imagen":imagenArray,
						   "titulo":tituloArray,
						   "precio":precioArray,
					       "tipo":tipoArray,
				           "peso":pesoArray,
				           "cantidad":cantidadArray});

		}

		localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

		sumaSubtotales();
		cestaCarrito(listaCarrito.length);
})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
SUMA DE TODOS LOS SUBTOTALES
=============================================*/
function sumaSubtotales(){

	var subtotales = $(".subtotales span");
	var arraySumaSubtotales = [];
	
	for(var i = 0; i < subtotales.length; i++){

		var subtotalesArray = $(subtotales[i]).html();
		arraySumaSubtotales.push(Number(subtotalesArray));
		
	}

	
	function sumaArraySubtotales(total, numero){

		return total + numero;

	}

	var sumaTotal = arraySumaSubtotales.reduce(sumaArraySubtotales);
	
	$(".sumaSubTotal").html('<strong>S/. <span>'+(sumaTotal).toFixed(2)+'</span></strong>');

	$(".sumaCesta").html((sumaTotal).toFixed(2));

	localStorage.setItem("sumaCesta", (sumaTotal).toFixed(2));


}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
ACTUALIZAR CESTA AL CAMBIAR CANTIDAD
=============================================*/
function cestaCarrito(cantidadProductos){

	/*=============================================
	SI HAY PRODUCTOS EN EL CARRITO
	=============================================*/

	if(cantidadProductos != 0){
		
		var cantidadItem = $(".cuerpoCarrito .cantidadItem");

		var arraySumaCantidades = [];
	
		for(var i = 0; i < cantidadItem .length; i++){

			var cantidadItemArray = $(cantidadItem[i]).val();
			arraySumaCantidades.push(Number(cantidadItemArray));
			
		}
	
		function sumaArrayCantidades(total, numero){

			return total + numero;

		}

		var sumaTotalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);
		
		$(".cantidadCesta").html(sumaTotalCantidades );
		localStorage.setItem("cantidadCesta", sumaTotalCantidades);

	}

}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
CHECKOUT
=============================================*/

$("#btnCheckout").click(function(){

	$(".listaProductos table.tablaProductos tbody").html("");

	$("#checkPaypal").prop("checked",true);
	$("#checkPayu").prop("checked", false);

	var idUsuario = $(this).attr("idUsuario");
	var peso = $(".cuerpoCarrito button, .comprarAhora button");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra, .comprarAhora .tituloCarritoCompra");
	var cantidad = $(".cuerpoCarrito .cantidadItem, .comprarAhora .cantidadItem");
	var subtotal = $(".cuerpoCarrito .subtotales span, .comprarAhora .subtotales span");
	var tipoArray =[];
	var cantidadPeso = [];

	/*=============================================
	SUMA SUBTOTAL
	=============================================*/
	var sumaSubTotal = $(subtotal);

	var sumaSubTotal = $(".sumaSubTotal span")
	// var subtotal = Number($(sumaSubTotal).html());
	// var resultadoDivision = subtotal / 0.18;

	$(".valorSubtotal").html($(sumaSubTotal).html());
	$(".valorSubtotal").attr("valor",$(sumaSubTotal).html());

	/*=============================================
	TASAS DE IMPUESTO
	=============================================*/

	// var impuestoTotal = ($(".valorSubtotal").html() * $("#tasaImpuesto").val()) /100;
	
	// $(".valorTotalImpuesto").html((impuestoTotal).toFixed(2));
	// $(".valorTotalImpuesto").attr("valor",(impuestoTotal).toFixed(2));

	// sumaTotalCompra()

	var subtotalimp = Number($(".valorSubtotal").html());
	var tasaImpuesto = 18; // 18%

	var impuestoTotal = (subtotalimp * tasaImpuesto) / 100;

	$(".valorTotalImpuesto").html(impuestoTotal.toFixed(2));
	$(".valorTotalImpuesto").attr("valor", impuestoTotal.toFixed(2));

	sumaTotalCompra()

	/*=============================================
	VARIABLES ARRAY 
	=============================================*/

	for(var i = 0; i < titulo.length; i++){

		var pesoArray = $(peso[i]).attr("peso");
		var tituloArray = $(titulo[i]).html();
		var cantidadArray = $(cantidad[i]).val();		
		var subtotalArray = $(subtotal[i]).html();

		/*=============================================
		EVALUAR EL PESO DE ACUERDO A LA CANTIDAD DE PRODUCTOS
		=============================================*/

		cantidadPeso[i] = pesoArray * cantidadArray;

		function sumaArrayPeso(total, numero){

			return total + numero;

		}

		var sumaTotalPeso = cantidadPeso.reduce(sumaArrayPeso);
		
		/*=============================================
		MOSTRAR PRODUCTOS DEFINITIVOS A COMPRAR
		=============================================*/

		$(".listaProductos table.tablaProductos tbody").append('<tr>'+
															   '<td class="valorTitulo">'+tituloArray+'</td>'+
															   '<td class="valorCantidad">'+cantidadArray+'</td>'+
															   '<td>S/ <span class="valorItem" valor="'+subtotalArray+'">'+subtotalArray+'</span></td>'+
															   '<tr>');

		/*=============================================
		SELECCIONAR DISTRITO DE ENVÍO SI HAY PRODUCTOS FÍSICOS
		=============================================*/
	
		tipoArray.push($(cantidad[i]).attr("tipo"));
		
		function checkTipo(tipo){

			return tipo == "fisico";
		
		}

	}

	/*=============================================
	EXISTEN PRODUCTOS FÍSICOS
	=============================================*/

	if(tipoArray.find(checkTipo) == "fisico"){

		$(".seleccioneDistrito").html('<select class="form-control" id="seleccionarDistrito" required>'+
						
						          '<option value="">Seleccione el distrito</option>'+

					              '</select>');


		$(".formEnvio").show();

		$(".btnPagar").attr("tipo","fisico");

		$.ajax({
			url:rutaOculta+"vistas/js/plugins/distritos.json",
			type: "GET",
			cache: false,
			contentType: false,
			processData:false,
			dataType:"json",
			success: function(respuesta){

				respuesta.forEach(seleccionarDistrito);

				function seleccionarDistrito(item, index){

					var distrito = item.name;
					$("#seleccionarDistrito").append('<option value="'+distrito+'">'+distrito+'</option>');
				
				}

			}
		})

		/*=============================================
		EVALUAR TASAS DE ENVÍO SI EL PRODUCTO ES FÍSICO
		=============================================*/

	// 	$("#seleccionarDistrito").change(function(){

	// 		$(".alert").remove();

	// 		var distrito = $(this).val();
	// 		var tasadistrito = $("#tasadistrito").val();

	// 		if(distrito == tasadistrito){

	// 			var resultadoPeso = sumaTotalPeso * $("#envioNacional").val();
				
	// 			if(resultadoPeso < $("#tasaMinimaNal").val()){

	// 				$(".valorTotalEnvio").html($("#tasaMinimaNal").val());
	// 				$(".valorTotalEnvio").attr("valor", $("#tasaMinimaNal").val());

	// 			}else{

	// 				$(".valorTotalEnvio").html(resultadoPeso);
	// 				$(".valorTotalEnvio").attr("valor",resultadoPeso);
	// 			}

	// 		}else{

	// 			var resultadoPeso = sumaTotalPeso * $("#envioInternacional").val();
				
	// 			if(resultadoPeso < $("#tasaMinimaInt").val()){

	// 				$(".valorTotalEnvio").html($("#tasaMinimaInt").val());
	// 				$(".valorTotalEnvio").attr("valor",$("#tasaMinimaInt").val());

	// 			}else{

	// 				$(".valorTotalEnvio").html(resultadoPeso);
	// 				$(".valorTotalEnvio").attr("valor",resultadoPeso);
	// 			}

	// 		}	

	// 		sumaTotalCompra();
	// 		pagarConPayu();

	// 	}
	// )

	}else{

		$(".btnPagar").attr("tipo","virtual");
	}

})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
SUMA TOTAL DE LA COMPRA
=============================================*/
function sumaTotalCompra(){
	/*SE RESTA EL 18% DEL PRECIO*/
	var subtotal=Number($(".valorSubtotal").html());
	var descuento=subtotal*0.18;
	var subtotaldesc=subtotal-descuento;

	var sumaTotalTasas = subtotaldesc+ 
	                     Number($(".valorTotalEnvio").html())+ 
	                     Number($(".valorTotalImpuesto").html());


	$(".valorTotalCompra").html((sumaTotalTasas).toFixed(2));
	$(".valorTotalCompra").attr("valor",(sumaTotalTasas).toFixed(2));

	localStorage.setItem("total",hex_md5($(".valorTotalCompra").html()));
}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
MÉTODO DE PAGO PARA CAMBIO DE DIVISA
=============================================*/

var metodoPago = "pago";
divisas(metodoPago);

$("input[name='pago']").change(function(){

	var metodoPago = $(this).val();

	divisas(metodoPago);

	if(metodoPago == "payu"){

		$(".btnPagar").hide();
		$(".formPayu").show();

		pagarConPayu();
		cambioDivisa('PEN')

	}else{

		$(".btnPagar").show();
		$(".formPayu").hide();

		cambioDivisa('PEN')

	}

})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
FUNCIÓN PARA EL CAMBIO DE DIVISA
=============================================*/

function divisas(metodoPago){

	$("#cambiarDivisa").html("");

	if(metodoPago == "paypal"){

		$("#cambiarDivisa").append('<option value="PEN">PEN</option>'
			)

	}
	// else{

	// 	$("#cambiarDivisa").append('<option value="USD">USD</option>'+
	// 		                       '<option value="PEN">PEN</option>'+
	// 		                       '<option value="COP">COP</option>'+
	// 		                       '<option value="MXN">MXN</option>'+
	// 		                       '<option value="CLP">CLP</option>'+
	// 		                       '<option value="ARS">ARS</option>'+
	// 		                       '<option value="BRL">BRL</option>')

	// }

}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
CAMBIO DE DIVISA
=============================================*/

var divisaBase = "PEN";

$("#cambiarDivisa").change(function(){

	$(".alert").remove();

	if($("#seleccionarDistrito").val() == ""){

		$("#cambiarDivisa").after('<div class="alert alert-warning">No ha seleccionado el distrito de envío</div>');

		return;

	}
	
	var divisa = $(this).val();

	cambioDivisa(divisa)


})


function cambioDivisa(divisa){
	
	$.ajax({

		url: "http://free.currconv.com/api/v7/convert?q="+divisaBase+"_"+divisa+"&compact=ultra&apiKey=cf2b1e499a7e50da66db",
		type:"GET",
		cache: false,
	    contentType: false,
	    processData: false,
	    dataType:"jsonp",
	    success:function(respuesta){
	    		    	    	
	    	var conversion = (respuesta["PEN_"]);

	    	$(".cambioDivisa").html(divisa);
	    	
	    	if(divisa == "PEN"){

	    		$(".valorSubtotal").html($(".valorSubtotal").attr("valor"))
		    	$(".valorTotalEnvio").html($(".valorTotalEnvio").attr("valor"))
		    	$(".valorTotalImpuesto").html($(".valorTotalImpuesto").attr("valor"))
		    	$(".valorTotalCompra").html($(".valorTotalCompra").attr("valor"))

		    	var valorItem = $(".valorItem");

		    	localStorage.setItem("total",hex_md5($(".valorTotalCompra").html()));

		    	for(var i = 0; i < valorItem.length; i++){

		    		$(valorItem[i]).html($(valorItem[i]).attr("valor"));

		    	}
	    		
	    	}else{
	
		    	$(".valorSubtotal").html(
		    		
		    		Math.ceil(Number(conversion) * Number($(".valorSubtotal").attr("valor")))/100

		    	)

		    	$(".valorTotalEnvio").html(

		    		(Number(conversion) * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2)

		    	)

		    	$(".valorTotalImpuesto").html(

		    		(Number(conversion) * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2)

		    	)

		    	$(".valorTotalCompra").html(

		    		(Number(conversion) * Number($(".valorTotalCompra").attr("valor"))).toFixed(2)

		    	)

				$(".valorDescripcion").html(

		    		($(".valorDescripcion").attr("valor"))

		    	)
				$(".valorProducto").html(

		    		($(".valorProducto").attr("valor"))

		    	)

		    	var valorItem = $(".valorItem");

		    	localStorage.setItem("total",hex_md5($(".valorTotalCompra").html()));

		    	for(var i = 0; i < valorItem.length; i++){

		    		$(valorItem[i]).html(
		    			
		    			(Number(conversion) * Number($(valorItem[i]).attr("valor"))).toFixed(2)

		    		);

		    	}

		    }

	    	sumaTotalCompra();

	    	pagarConPayu();

	    },
	    error:function(jqXHR,textStatus,errorThrow){

	    	if(textStatus == "error"){

	    		$("#cambiarDivisa").after('<div class="alert alert-warning">Tenemos problemas para hacer la conversión, intente más tarde</div>');

	    		return;

	    	}

	    }

	})	

}
/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
BOTÓN PAGAR PAYU
=============================================*/

function pagarConPayu(){

	if($("#seleccionarDistrito").val() == ""){

		$(".formPayu").after('<div class="alert alert-warning">No ha seleccionado el distrito de envío</div>');
		
		$(".formPayu input[name='Submit']").attr("type","button");
		
		return;

	}

	var divisa = $("#cambiarDivisa").val();
	var total = $(".valorTotalCompra").html();
	var impuesto = $(".valorTotalImpuesto").html();
	var envio = $(".valorTotalEnvio").html();
	var subtotal = $(".valorSubtotal").html();
	var titulo = $(".valorTitulo");
	var cantidad = $(".valorCantidad");
	var valorItem = $(".valorItem");
	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');
	var tituloArray = [];
	var cantidadArray = [];
	var idProductoArray = [];
	var valorItemArray = [];

	for(var i = 0; i < titulo.length; i++){

		tituloArray[i] = $(titulo[i]).html();
		cantidadArray[i] = $(cantidad[i]).html();
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");
		valorItemArray[i] = $(valorItem[i]).html();

	}

	var valorItemString = valorItemArray.toString();
	var pago = valorItemString.replace(",","-");

	var datos = new FormData();
	datos.append("metodoPago", "payu");
	datos.append("cantidadArray",cantidadArray);
	datos.append("valorItemArray",valorItemArray);
	datos.append("idProductoArray",idProductoArray);
	datos.append("divisaPayu", divisa);

	if(hex_md5(total) == localStorage.getItem("total")){

		$.ajax({
	      url:rutaOculta+"ajax/carrito.ajax.php",
	      method:"POST",
	      data: datos,
	      cache: false,
	      contentType: false,
	      processData: false,
	      success:function(respuesta){      	
	      	
	      	if(respuesta.charAt(0) == "{"){     			      		
	      	
	          var merchantId = JSON.parse(respuesta).merchantIdPayu;
	          var accountId = JSON.parse(respuesta).accountIdPayu;
	          var apiKey = JSON.parse(respuesta).apiKeyPayu;
	          var modo = JSON.parse(respuesta).modoPayu;
	          var description = tituloArray.toString();
	          var referenceCode = (Number(Math.ceil(Math.random()*1000000))+Number(total).toFixed());
	          var productosToString = idProductoArray.toString();
	          var productos = productosToString.replace(/,/g, "-");
	          var cantidadToString = cantidadArray.toString();
	          var cantidad = cantidadToString.replace(/,/g, "-");
	          var signature = hex_md5(apiKey+"~"+merchantId+"~"+referenceCode+"~"+total+"~"+divisa);
	       

	          if(divisa == "COP"){

	          	var taxReturnBase = (total - impuesto).toFixed(2)

	          }else{

	          	var taxReturnBase = 0;

	          }        

	          if(modo == "sandbox"){

	            var url = "https://sandbox.gateway.payulatam.com/ppp-web-gateway/";
	            var test = 1;

	      	  }else{

	      	  	var url = "https://gateway.payulatam.com/ppp-web-gateway/";
	      	  	var test = 0;

	      	  }

	      	  if(envio != 0){

	      	  	var tipoEnvio = "YES";
	      	  
	      	  }else{

	      	  	var tipoEnvio = "NO";
	      	  }

	           $(".formPayu").attr("method","POST");
	           $(".formPayu").attr("action",url);
			   $(".formPayu input[name='merchantId']").attr("value", merchantId);
			   $(".formPayu input[name='accountId']").attr("value", accountId);
			   $(".formPayu input[name='description']").attr("value", description);
			   $(".formPayu input[name='referenceCode']").attr("value", referenceCode);
			   $(".formPayu input[name='amount']").attr("value", total);
			   $(".formPayu input[name='tax']").attr("value", impuesto);
			   $(".formPayu input[name='taxReturnBase']").attr("value", taxReturnBase);
			   $(".formPayu input[name='shipmentValue']").attr("value", envio);
			   $(".formPayu input[name='currency']").attr("value", divisa);
			   $(".formPayu input[name='responseUrl']").attr("value", rutaOculta+"index.php?ruta=finalizar-compra&payu=true&productos="+productos+"&cantidad="+cantidad+"&pago="+pago);
			   $(".formPayu input[name='declinedResponseUrl']").attr("value", rutaOculta+"carrito-de-compras");
			   $(".formPayu input[name='displayShippingInformation']").attr("value", tipoEnvio);
			   $(".formPayu input[name='test']").attr("value", test);
			   $(".formPayu input[name='signature']").attr("value", signature);

			   /*=============================================
				GENERADOR DE TARJETAS DE CRÉDITO
				https://www.mercadopago.com.co/developers/es/guides/resources/localization/local-cards
				=============================================*/

			}

	      }

	  })
	}
}


/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
AGREGAR PRODUCTOS GRATIS
=============================================*/
$(".agregarGratis").click(function(){

	var idProducto = $(this).attr("idProducto");
	var idUsuario = $(this).attr("idUsuario");
	var tipo = $(this).attr("tipo");
	var titulo = $(this).attr("titulo");
	var agregarGratis = false;

	/*=============================================
	VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO
	=============================================*/

	var datos = new FormData();

	datos.append("idUsuario", idUsuario);
	datos.append("idProducto", idProducto);

	$.ajax({
		url:rutaOculta+"ajax/carrito.ajax.php",
		method:"POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	success:function(respuesta){

			
      	    
      	    if(respuesta != "false"){

  	    		swal({
				  title: "¡Usted ya adquirió este producto!",
				  text: "",
				  type: "warning",
				  showCancelButton: false,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Regresar",
				  closeOnConfirm: false
				})
console.log(respuesta);

      	    }else{

				if(tipo == "virtual"){

					agregarGratis = true;

				}else{

					var seleccionarDetalle = $(".seleccionarDetalle");

					for(var i = 0; i < seleccionarDetalle.length; i++){

						if($(seleccionarDetalle[i]).val() == ""){

								swal({
									  title: "Debe seleccionar Color",
									  text: "",
									  type: "warning",
									  showCancelButton: false,
									  confirmButtonColor: "#DD6B55",
									  confirmButtonText: "¡Seleccionar!",
									  closeOnConfirm: false
									})

						}else{

							titulo = titulo + "-" + $(seleccionarDetalle[i]).val();

							agregarGratis = true;

						}

					}		

				}

				if(agregarGratis){

					window.location = rutaOculta+"index.php?ruta=finalizar-compra&gratis=true&producto="+idProducto+"&titulo="+titulo;

				}
    	    
      	    }

      	}

	})
	

})



/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
AGREGAR PRODUCTOS PAGO
=============================================*/
$(".agregarPago").click(function(){
	var idProducto = $(this).attr("idProducto");
	var idUsuario = $(this).attr("idUsuario");
	var tipo = $(this).attr("tipo");
	var titulo = $(this).attr("titulo");
	var agregarPago = false;
	/*=============================================
	VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO
	=============================================*/
	var datos = new FormData();
	datos.append("idUsuario", idUsuario);
	datos.append("idProducto", idProducto);
	$.ajax({
		url:rutaOculta+"ajax/carrito.ajax.php",
		method:"POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	success:function(respuesta){
      	    if(respuesta != "true"){
				if(tipo == "virtual"){
					agregarPago = true;
				}else{
					var seleccionarDetalle = $(".seleccionarDetalle");
					for(var i = 0; i < seleccionarDetalle.length; i++){
						if($(seleccionarDetalle[i]).val() == ""){
								swal({
									  title: "Debe seleccionar Color",
									  text: "",
									  type: "warning",
									  showCancelButton: false,
									  confirmButtonColor: "#DD6B55",
									  confirmButtonText: "¡Seleccionar!",
									  closeOnConfirm: false
									})
						}else{
							titulo = titulo + "-" + $(seleccionarDetalle[i]).val();
							agregarPago = true;
						}
					}		
				}
				if(agregarPago){
					window.location = rutaOculta+"index.php?ruta=finalizar-compra&pagar=true&producto="+idProducto+"&titulo="+titulo;
				}
      	    }
      	}
	})
})

// $(".btnRealizarPago1").click(function(){
// 	var idProducto = $(this).attr("idProducto");
// 	var idUsuario = $(this).attr("idUsuario");
// 	var tipo = $(this).attr("tipo");
// 	var titulo = $(this).attr("titulo");
// 	var RealizarPago = false;
// 	/*=============================================
// 	VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO
// 	=============================================*/
// 	var datos = new FormData();
// 	datos.append("idUsuario", idUsuario);
// 	datos.append("idProducto", idProducto);
// 	$.ajax({
// 		url:rutaOculta+"ajax/carrito.ajax.php",
// 		method:"POST",
//       	data: datos,
//       	cache: false,
//       	contentType: false,
//       	processData: false,
//       	success:function(respuesta){
//       	    if(respuesta != "true"){
// 					RealizarPago = true;
// 					RealizarPago = true;
// 				if(RealizarPago){
// 					window.location = rutaOculta+"index.php?ruta=finalizar-compra&pagar=true&producto="+idProducto+"&titulo="+titulo;
// 				}
//       	    }
//       	}
// 	})
// })


// $(".btnPagoExitosoo").click(function(){
// 	var idProducto = $(this).attr("idProducto");
// 	var idUsuario = $(this).attr("idUsuario");
// 	// var tipo = $(this).attr("tipo");
// 	var titulo = $(this).attr("titulo");
// 	var RealizarPago = false;
// 	/*=============================================
// 	VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO
// 	=============================================*/
// 	var datos = new FormData();
// 	datos.append("idUsuario", idUsuario);
// 	datos.append("idProducto", idProducto);
// 	$.ajax({
// 		url:rutaOculta+"ajax/producto.ajax.php",
// 		method:"POST",
//       	data: datos,
//       	cache: false,
//       	contentType: false,
//       	processData: false,
//       	success:function(respuesta){
//       	    if(respuesta != "true"){
// 					RealizarPago = true;
// 					RealizarPago = true;
// 				if(RealizarPago){
// 					window.location = rutaOculta+"index.php?ruta=finalizar-compra&pagado=true&producto="+idProducto+"&titulo="+titulo;
// 				}
//       	    }
//       	}
// 	})
// })

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
MODAL PASARELA DE PAGO
=============================================*/


// $(document).ready(function(){
// 	// cuando se presiona el boton PAGAR realizar la siguiente accion
// 	$(".btnPago").click(function(){
// 		// Opcional: Validar forma de pago o mostrar loader
// 		// Ocultar contenido actual
// 		$(".contenidoCheckout").hide();
// 		// Mostrar la nueva interfaz
// 		$(".contenidoPagoFinal").show();
// 		// Si deseas ejecutar lógica adicional, puedes hacerlo aquí
// 		// window.location = rutaOculta+"index.php?ruta=finalizar-compra&pago=true&producto="+idProducto+"&titulo="+titulo;
// 	});
// 	$(".btnPayment").click(function(){
// 		$(".contenidoPagoFinal").hide();
// 		// Mostrar la nueva interfaz
// 		$(".contenidoCheckout").hide();
// 		// $(".contenidoPagoExitoso").show();
// 		// document.getElementById("modalCheckout").style.display = "none"; 
// 		swal({
// 			type: "success",
// 			title: "Se realizó correctamente la compra",
// 			showConfirmButton: true,
// 			confirmButtonText: "Ir a mis compras"
// 			}).then(function(isConfirm){
// 			if (isConfirm) {
// 				// rutaOculta+"carrito-de-compras";					
// 				window.location = "http://localhost/modo-desarrollo/frontend/";
// 				}
// 			});
// 	});
// });


/**---------------------------------------------------------------------
 * PARA LA PASARELA DE PAGO CUANDO SE COLOCA LA TARJETA DEBITO O CREDITO
 ---------------------------------------------------------------------*/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})



/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
BOTÓN PAGAR PAYPAL
=============================================*/

// $(".btnRealizarPago").click(function(){
// 	// var tipo = $(this).attr("tipo");
// 	// if(tipo == "fisico" && $("#seleccionarDistrito").val() == ""){
// 	// 	$(".btnPagar").after('<div class="alert alert-warning">No ha seleccionado el distrito de envío</div>');
// 	// 	return;
// 	// }
// 	// var divisa = $("#cambiarDivisa").val();
// 	var total = $(".valorTotalCompra").html();
// 	var totalEncriptado = localStorage.getItem("total");
// 	var impuesto = $(".valorTotalImpuesto").html();
// 	var envio = $(".valorTotalEnvio").html();
// 	var subtotal = $(".valorSubtotal").html();
// 	var titulo = $(".valorTitulo");
// 	var cantidad = $(".valorCantidad");
// 	var valorItem = $(".valorItem");
// 	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');
// 	var tituloArray = [];
// 	var cantidadArray = [];
// 	var valorItemArray = [];
// 	var idProductoArray = [];
// 	for(var i = 0; i < titulo.length; i++){
// 		tituloArray[i] = $(titulo[i]).html();
// 		cantidadArray[i] = $(cantidad[i]).html();
// 		valorItemArray[i] = $(valorItem[i]).html();
// 		idProductoArray[i] = $(idProducto[i]).attr("idProducto");
// 	}
// 	var datos = new FormData();
// 	// datos.append("divisa", divisa);
// 	datos.append("total",total);
// 	datos.append("totalEncriptado",totalEncriptado);
// 	datos.append("impuesto",impuesto);
// 	datos.append("envio",envio);
// 	datos.append("subtotal",subtotal);
// 	datos.append("tituloArray",tituloArray);
// 	datos.append("cantidadArray",cantidadArray);
// 	datos.append("valorItemArray",valorItemArray);
// 	datos.append("idProductoArray",idProductoArray);
// 	$.ajax({
// 		 url:rutaOculta+"ajax/carrito.ajax.php",
// 		 method:"POST",
// 		 data: datos,
// 		 cache: false,
//          contentType: false,
//          processData: false,
//          success:function(respuesta){
//             window.location = respuesta;
//          }
// 	})
// })




/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
BOTÓN PAGAR PAYPAL
=============================================*/

$(".btnPagar").click(function(){
	var tipo = $(this).attr("tipo");

	if(tipo == "fisico" && $("#seleccionarDistrito").val() == ""){
		$(".btnPagar").after('<div class="alert alert-warning">No ha seleccionado el distrito de envío</div>');
		return;
	}

	// var divisa = $("#cambiarDivisa").val();
	var total = $(".valorTotalCompra").html();
	var totalEncriptado = localStorage.getItem("total");
	var impuesto = $(".valorTotalImpuesto").html();
	var distrito = $("#seleccionarDistrito").val(); // <-- OBTENER DISTRITO
	var envio = $(".valorTotalEnvio").html();
	var subtotal = $(".valorSubtotal").html();
	var titulo = $(".valorTitulo");
	var cantidad = $(".valorCantidad");
	var valorItem = $(".valorItem");
	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');

	var tituloArray = [];
	var cantidadArray = [];
	var valorItemArray = [];
	var idProductoArray = [];

	for(var i = 0; i < titulo.length; i++){
		tituloArray[i] = $(titulo[i]).html();
		cantidadArray[i] = $(cantidad[i]).html();
		valorItemArray[i] = $(valorItem[i]).html();
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");
	}

	var datos = new FormData();
	datos.append("accion", "guardarCompra");
	// datos.append("divisa", divisa);
	datos.append("total", total);
	datos.append("totalEncriptado", totalEncriptado);
	datos.append("impuesto", impuesto);
	datos.append("envio", envio);
	datos.append("subtotal", subtotal);
	datos.append("distrito", distrito); // <-- AGREGAR A FORM DATA
	datos.append("tituloArray", JSON.stringify(tituloArray));
	datos.append("cantidadArray", JSON.stringify(cantidadArray));
	datos.append("valorItemArray", JSON.stringify(valorItemArray));
	datos.append("idProductoArray", JSON.stringify(idProductoArray));

	$.ajax({
		url: rutaOculta+"ajax/carrito.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		success: function(respuesta){
			// console.log("Respuesta AJAX:", respuesta); 
			if(respuesta == "ok"){
				localStorage.removeItem("listaProductos");
				localStorage.removeItem("cantidadCesta");
				localStorage.removeItem("sumaCesta");
				window.location = rutaOculta + "perfil";
			} else {
				alert("Error al procesar la compra. Inténtalo nuevamente.");
			}
		}
	});
});