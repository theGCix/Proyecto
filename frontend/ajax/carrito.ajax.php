<?php

require_once "../extensiones/paypal.controlador.php";

require_once "../controladores/carrito.controlador.php";
require_once "../modelos/carrito.modelo.php";

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";


require_once "../controladores/notificaciones.controlador.php";
require_once "../modelos/notificaciones.modelo.php";
require_once "../modelos/usuarios.modelo.php";


require_once "../controladores/usuarios.controlador.php";
require_once "../modelos/usuarios.modelo.php";
class AjaxCarrito{

	/*=============================================
	MÉTODO PAYPAL
	=============================================*/	

	public $divisa;
	public $total;
	public $totalEncriptado;
	public $impuesto;
	public $envio;
	public $subtotal;
	public $tituloArray;
	public $cantidadArray;
	public $valorItemArray;
	public $idProductoArray;

	public function ajaxEnviarPaypal(){

		if(md5($this->total) == $this->totalEncriptado){

				$datos = array(
						"divisa"=>$this->divisa,
						"total"=>$this->total,
						"impuesto"=>$this->impuesto,
						"envio"=>$this->envio,
						"subtotal"=>$this->subtotal,
						"tituloArray"=>$this->tituloArray,
						"cantidadArray"=>$this->cantidadArray,
						"valorItemArray"=>$this->valorItemArray,
						"idProductoArray"=>$this->idProductoArray,
					);

				$respuesta = Paypal::mdlPagoPaypal($datos);

				echo $respuesta;

		}
	}

	/*=============================================
	MÉTODO PAYU
	=============================================*/

	public function ajaxTraerComercioPayu(){

		$respuesta = ControladorCarrito::ctrMostrarTarifas(); 

		echo json_encode($respuesta);
	}

	/*=============================================
	VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO
	=============================================*/

	public $idUsuario;
	public $idProducto;

	public function ajaxVerificarProducto(){

		$datos = array("idUsuario"=>$this->idUsuario,
					   "idProducto"=>$this->idProducto);

		$respuesta = ControladorCarrito::ctrVerificarProducto($datos);

		echo json_encode($respuesta);

	}


}
/*=============================================
MÉTODO COMPRA
=============================================*/	

if(isset($_POST["accion"]) && $_POST["accion"] == "guardarCompra") {

	session_start(); // Asegúrate de tener acceso a $_SESSION["id"]

	$idUsuario = $_SESSION["id"];
	
	$emailUsuario = $_SESSION["email"];
	$usuario = ControladorUsuarios::ctrMostrarUsuario("id", $idUsuario);
	// echo "<pre>";
	// print_r($usuario);
	// echo "</pre>";
	// exit;
	$direccion = $usuario["direccion"];
	$distrito = $_POST["distrito"];
	$total = $_POST["total"];
	$totalEncriptado = $_POST["totalEncriptado"];
	$impuesto = $_POST["impuesto"];
	// $envio = $_POST["envio"];
	$subtotal = $_POST["subtotal"];

	$tituloArray = json_decode($_POST["tituloArray"]);
	$cantidadArray = json_decode($_POST["cantidadArray"]);
	$valorItemArray = json_decode($_POST["valorItemArray"]);
	$idProductoArray = json_decode($_POST["idProductoArray"]);

	// Validación simple de integridad
	if(md5($total) !== $totalEncriptado){
		echo "error-validacion";
		return;
	}

	for($i = 0; $i < count($idProductoArray); $i++){

		$datos = array(
			"idUsuario" => $idUsuario,
			"idProducto" => $idProductoArray[$i],
			"metodo" => "paga", // sin pasarela
			"email" => $emailUsuario, // opcional
			"direccion" =>$direccion, // podrías incluir el distrito aquí si es físico
			"distrito" => $distrito, // si aplica
			"cantidad" => $cantidadArray[$i],
			"detalle" => $tituloArray[$i],
			"pago" => $valorItemArray[$i]
		);

		$respuesta = ControladorCarrito::ctrNuevasCompras($datos);

		// Actualiza ventas por producto
		$item1 = "ventas";
		$valor1 = $cantidadArray[$i];

		$item2 = "id";
		$valor2 = $idProductoArray[$i];

		ControladorProductos::ctrActualizarProducto($item1, $valor1, $item2, $valor2);
	}

	if($respuesta == "ok"){
		echo "ok";
	} else {
		echo "error";
	}
}

/*=============================================
MÉTODO PAYU
=============================================*/	

if(isset($_POST["metodoPago"]) && $_POST["metodoPago"] == "payu"){

	$idProductos = explode("," , $_POST["idProductoArray"]);
	$cantidadProductos = explode("," , $_POST["cantidadArray"]);
	$precioProductos = explode("," , $_POST["valorItemArray"]);

	$item = "id";

	for($i = 0; $i < count($idProductos); $i ++){

		$valor = $idProductos[$i];

		$verificarProductos = ControladorProductos::ctrMostrarInfoProducto($item, $valor);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "http://free.currconv.com/api/v7/convert?q=USD_".$_POST["divisaPayu"]."&compact=ultra&apiKey=cf2b1e499a7e50da66db"); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

		if(curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200){
		
			$divisa = curl_exec($ch);

			$jsonDivisa = json_decode($divisa, true);   

			if($jsonDivisa["status"] == 400){
			
				$conversion = 1;
			
			}else{

				$conversion = $jsonDivisa["USD_".$_POST["divisaPayu"]];

			}

		}else{

			$conversion = 1;

		}

		if($verificarProductos["precioOferta"] == 0){

			$precio = $verificarProductos["precio"]*$conversion;
		
		}else{

			$precio = $verificarProductos["precioOferta"]*$conversion;

		}

		$verificarSubTotal = $cantidadProductos[$i]*$precio;

		// echo number_format($verificarSubTotal,2)."<br>";
		// echo number_format($precioProductos[$i],2)."<br>";

		// return;

		if(number_format($verificarSubTotal,2) != number_format($precioProductos[$i],2)){

			echo "carrito-de-compras";

			return;

		}

	}

	$payu = new AjaxCarrito();
	$payu -> ajaxTraerComercioPayu();

}

/*=============================================
VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO
=============================================*/	

if(isset($_POST["idUsuario"])){
	$deseo = new AjaxCarrito();
	$deseo -> idUsuario = $_POST["idUsuario"];
	$deseo -> idProducto = $_POST["idProducto"];
	$deseo ->ajaxVerificarProducto();
}

// // Lo recibes como string y lo decodificas
// 		$productosJson = $_POST["productos"];
// 		$productos = json_decode($productosJson, true);

// 		// Recorrer los productos
// 		foreach ($productos as $producto) {
// 			$id = $producto["id"];
// 			$precio = $producto["precio"];
// 			// Procesar...
// 		}

// 		echo json_encode(["ok" => true, "recibidos" => count($productos)]);