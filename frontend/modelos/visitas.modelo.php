<?php

require_once "conexion.php";

class ModeloVisitas{

	/*=============================================
	BUSCAR IP EXISTENTE
	=============================================*/

	static public function mdlSeleccionarIp($tabla, $ip){

		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE ip = :ip");

		$stmt->bindParam(":ip", $ip, PDO::PARAM_STR);

		$stmt -> execute();

		return $stmt -> fetchAll();

		$stmt -> close();

	}
	

	/*=============================================
	GUARDAR IP NUEVA
	=============================================*/

	static public function mdlGuardarNuevaIp($tabla, $ip, $distrito, $visita){

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(ip, distrito, visitas) VALUES (:ip, :distrito, :visitas)");

		$stmt->bindParam(":ip", $ip, PDO::PARAM_STR);
		$stmt->bindParam(":distrito", $distrito, PDO::PARAM_STR);
		$stmt->bindParam(":visitas", $visita, PDO::PARAM_INT);
	
		if($stmt->execute()){

			return "ok";	

		}else{

			return "error";	
		}

		$stmt->close();

		$stmt = null;
	}

	/*=============================================
	SELECCIONAR distrito
	=============================================*/
	
	static public function mdlseleccionarDistrito($tabla, $distrito){
		
		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE distrito = :distrito");
		
		$stmt->bindParam(":distrito", $distrito, PDO::PARAM_STR);

		$stmt -> execute();

		return $stmt -> fetch();

		$stmt -> close();

		$stmt = null;
	
	}


	/*=============================================
	INSERTAR distrito
	=============================================*/
	static public function mdlInsertardistrito($tabla, $distrito, $cantidad, $codigo){

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(distrito, codigo, cantidad) VALUES (:distrito, :codigo, :cantidad)");

		$stmt->bindParam(":distrito", $distrito, PDO::PARAM_STR);
		$stmt->bindParam(":codigo", $codigo, PDO::PARAM_STR);
		$stmt->bindParam(":cantidad", $cantidad, PDO::PARAM_INT);

		if($stmt->execute()){

			return "ok";	

		}else{

			return "error";	
		}

		$stmt->close();

		$stmt = null;

	}

	/*=============================================
	SI EXISTE EL distrito ACTUALIZAR NUEVA VISITA
	=============================================*/	

	static public function mdlActualizarDistrito($tabla, $distrito, $actualizarCantidad){

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET cantidad = :cantidad WHERE distrito = :distrito");

		$stmt->bindParam(":cantidad", $actualizarCantidad, PDO::PARAM_INT);
		$stmt->bindParam(":distrito", $distrito, PDO::PARAM_STR);
		
		if($stmt->execute()){

			return "ok";	

		}else{

			return "error";	
		}

		$stmt->close();

		$stmt = null;

	}

	/*=============================================
	MOSTRAR EL TOTAL DE VISITAS
	=============================================*/	

	static public function mdlMostrarTotalVisitas($tabla){

		$stmt = Conexion::conectar()->prepare("SELECT SUM(cantidad) as total FROM $tabla");

		$stmt -> execute();

		return $stmt -> fetch();

		$stmt -> close();

		$stmt = null;

	}

	/*=============================================
	MOSTRAR LOS PRIMEROS 6 distritoES DE VISITAS
	=============================================*/
	
	static public function mdlMostrardistritoes($tabla){
		
		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY cantidad DESC LIMIT 6");

		$stmt -> execute();

		return $stmt -> fetchAll();

		$stmt -> close();
	
	}

}