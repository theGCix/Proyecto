<?php

class ControladorVisitas{

	/*=============================================
	MOSTRAR TOTAL VISITAS
	=============================================*/

	static public function ctrMostrarTotalVisitas(){

		$tabla = "visitasdistritos";

		$respuesta = ModeloVisitas::mdlMostrarTotalVisitas($tabla);

		return $respuesta;

	}

	/*=============================================
	MOSTRAR Distritos DE VISITAS
	=============================================*/
	
	static public function ctrMostrarDistritos($orden){

		$tabla = "visitasdistritos";
	
		$respuesta = ModeloVisitas::mdlMostrarDistritos($tabla, $orden);
		
		return $respuesta;
	}

	/*=============================================
	MOSTRAR VISITAS
	=============================================*/
	
	static public function ctrMostrarVisitas(){

		$tabla = "visitaspersonas";
	
		$respuesta = ModeloVisitas::mdlMostrarVisitas($tabla);
		
		return $respuesta;
	}


}