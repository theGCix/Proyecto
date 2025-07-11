<?php

class ControladorVisitas{

	/*=============================================
	GUARDAR IP
	=============================================*/

	static public function ctrEnviarIp($ip, $distrito, $codigo){

		$tabla = "visitaspersonas";
		$visita = 1;

		$respuestaInsertarIp = null;
		$respuestaActualizarIp = null;

		if($distrito == ""){

			$distrito = "Unknown";
			// $codigo = "NK";
		}

		/*=============================================
		BUSCAR IP EXISTENTE
		=============================================*/

		$buscarIpExistente = ModeloVisitas::mdlSeleccionarIp($tabla, $ip);

		if(!$buscarIpExistente){

			/*=============================================
			GUARDAR IP NUEVA
			=============================================*/

			$respuestaInsertarIp = ModeloVisitas::mdlGuardarNuevaIp($tabla, $ip, $distrito, $visita);

		}else{

			/*=============================================
			SI LA IP EXISTE Y ES OTRO DIA VOLVERLA A GUARDAR
			=============================================*/
			date_default_timezone_set('America/Bogota');
			
			$fechaActual = date('Y-m-d');

			foreach ($buscarIpExistente as $key => $value) {

				$compararFecha = substr($value["fecha"],0,10);
	
			}

			if($fechaActual != $compararFecha){

				$respuestaActualizarIp = ModeloVisitas::mdlGuardarNuevaIp($tabla, $ip, $distrito, $visita);	
				
			}

		}


		if($respuestaInsertarIp == "ok" || $respuestaActualizarIp == "ok"){

			$tabladistrito = "visitasdistritos";

			/*=============================================
			SELECCIONAR distrito
			=============================================*/

			$seleccionarDistrito = ModeloVisitas::mdlseleccionarDistrito($tabladistrito, $distrito);

			if(!$seleccionarDistrito){

				/*=============================================
				SI NO EXISTE EL distrito AGREGAR NUEVO distrito
				=============================================*/	

				$cantidad = 1;

				$insertardistrito = ModeloVisitas::mdlInsertardistrito($tabladistrito, $distrito, $cantidad, $codigo);

			}else{

				/*=============================================
				SI EXISTE EL distrito ACTUALIZAR UNA NUEVA VISITA
				=============================================*/	
				 $actualizarCantidad = $seleccionarDistrito["cantidad"] + 1;

				 $actualizardistrito = ModeloVisitas::mdlActualizardistrito($tabladistrito, $distrito, $actualizarCantidad);

			}	

		}
		
	}

	/*=============================================
	MOSTRAR EL TOTAL DE VISITAS
	=============================================*/	

	static public function ctrMostrarTotalVisitas(){

		$tabla = "visitasdistritos";

		$respuesta = ModeloVisitas::mdlMostrarTotalVisitas($tabla);

		return $respuesta;

	}

	/*=============================================
	MOSTRAR LOS PRIMEROS 6 distritoES DE VISITAS
	=============================================*/
	
	static public function ctrMostrardistritos(){

		$tabla = "visitasdistritos";
	
		$respuesta = ModeloVisitas::mdlMostrardistritos($tabla);
		
		return $respuesta;
	}

}