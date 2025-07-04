<div id="modalCheckout" class="modal fade modalFormulario" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-body modalTitulo">
        <h3 class="backColor">REALIZAR PAGO</h3>
        <button type="button" class="close" data-dismiss="modal">&times;</button>

        <div class="contenidoCheckout">
          <?php
          $respuesta = ControladorCarrito::ctrMostrarTarifas();
          echo '
            <input type="hidden" id="tasaImpuesto" value="'.$respuesta["impuesto"].'">
            <input type="hidden" id="envioNacional" value="'.$respuesta["envioNacional"].'">
            <input type="hidden" id="envioInternacional" value="'.$respuesta["envioInternacional"].'">
            <input type="hidden" id="tasaMinimaNal" value="'.$respuesta["tasaMinimaNal"].'">
            <input type="hidden" id="tasaMinimaInt" value="'.$respuesta["tasaMinimaInt"].'">
            <input type="hidden" id="tasaPais" value="'.$respuesta["pais"].'">
          ';
          ?>

          <div class="formEnvio row">
            <h4 class="text-center well text-muted text-uppercase">Información de envío</h4>
            <div class="col-xs-12 seleccionePais"></div>
          </div>

          <br>

          <div class="formaPago row">
            <h4 class="text-center well text-muted text-uppercase">Elige la forma de pago</h4>
            <figure class="col-xs-6">
              <center>
                <input id="checkPaypal" type="radio" name="pago" value="paypal" checked>
              </center>
              <img src="<?php echo $url; ?>vistas/img/plantilla/paypal.jpg" class="img-thumbnail">
            </figure>
          </div>

          <br>

          <div class="listaProductos row">
            <h4 class="text-center well text-muted text-uppercase">Productos a comprar</h4>
            <table class="table table-striped tablaProductos">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

            <div class="col-sm-6 col-xs-12 pull-right">
              <table class="table table-striped tablaTasas">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td><span class="cambioDivisa">S/ </span><span class="valorSubtotal" valor="0">0</span></td>
                  </tr>
                  <tr>
                    <td>Envío</td>
                    <td><span class="cambioDivisa">S/ </span><span class="valorTotalEnvio" valor="0">0</span></td>
                  </tr>
                  <tr>
                    <td>Impuesto</td>
                    <td><span class="cambioDivisa">S/ </span><span class="valorTotalImpuesto" valor="0">0</span></td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong><span class="cambioDivisa">S/ </span><span class="valorTotalCompra" valor="0">0</span></strong></td>
                  </tr>
                </tbody>
              </table>

              <div class="divisa">
                <select class="form-control" id="cambiarDivisa" name="divisa"></select>
                <br>
              </div>
            </div>

            <div class="clearfix"></div>

            <form class="formPayu" style="display:none">
              <input name="merchantId" type="hidden" value=""/>
              <input name="accountId" type="hidden" value=""/>
              <input name="description" type="hidden" value=""/>
              <input name="referenceCode" type="hidden" value=""/>
              <input name="amount" type="hidden" value=""/>
              <input name="tax" type="hidden" value=""/>
              <input name="taxReturnBase" type="hidden" value=""/>
              <input name="shipmentValue" type="hidden" value=""/>
              <input name="currency" type="hidden" value=""/>
              <input name="lng" type="hidden" value="es"/>
              <input name="confirmationUrl" type="hidden" value=""/>
              <input name="responseUrl" type="hidden" value=""/>
              <input name="declinedResponseUrl" type="hidden" value=""/>
              <input name="displayShippingInformation" type="hidden" value=""/>
              <input name="test" type="hidden" value=""/>
              <input name="signature" type="hidden" value=""/>
              <input name="Submit" class="btn btn-block btn-lg btn-default backColor" type="submit" value="PAGAR">
            </form>

            <button class="btn btn-block btn-lg btn-default backColor btnPago">PAGAR</button>
          </div>
        </div>

        <div class="contenidoPagoFinal" style="display:none;">
          <form id="msform">
            <ul id="progressbar">
              <li class="active">Medio de Pago</li>
              <li>Datos de Tarjeta</li>
              <li>Pagar</li>
            </ul>

            <fieldset>
              <h2 class="fs-title">Vas a Pagar</h2>
              <div id="details">
                <p class="valorProducto" valor="0">Producto: 0</p>
                <p class="valorDescripciona" valor="0">Descripción: 0</p>
                <p class="valorTotalCompra" valor="0">Monto: 0</p>
              </div>
              <h3 class="fs-subtitle">Selecciona el Medio de Pago</h3>
              <input type="button" name="next" class="next visa" value="Tarjeta de Débito" />
              <input type="button" name="next" class="next mastercard" value="Tarjeta de Crédito" />
              <input type="button" name="next" class="next action-button" value="Siguiente" />
            </fieldset>

            <fieldset>
              <h2 class="fs-title">Datos de Tarjeta</h2>
              <h3 class="fs-subtitle">Complete con los datos de la tarjeta.</h3>
              <input type="text" name="nrotarjeta" placeholder="Nro de Tarjeta" />
              <input type="text" name="titular" placeholder="Titular" />
              <input type="text" name="dni" placeholder="DNI" />
              <input type="text" name="vencimiento" placeholder="Vencimiento" />
              <input type="text" name="CVC" placeholder="CVC" />
              <input type="button" name="previous" class="previous action-button" value="Volver" />
              <input type="button" name="next" class="next action-button" value="Siguiente" />
            </fieldset>

            <fieldset>
              <h2 class="fs-title">Resumen y Pago</h2>
              <h3 class="fs-subtitle">Resumen de lo que va a pagar</h3>
              <p class="valorProducto" valor="0">Producto: 0</p>
              <p class="valorDescripciona" valor="0">Descripción: 0</p>
              <p class="valorTotalCompra" valor="0">Monto: 0</p>
              <p>Tarjeta Nro: 4512*********2365</p>
              <input type="button" name="previous" class="previous action-button" value="Volver" />
              <input type="submit" name="submit" class="submit action-button btnPayment" value="Pagar" />
			<?php
			if(isset($_SESSION["validarSesion"]) && $_SESSION["validarSesion"] == "ok"){

			  $item =  "ruta";
				$valor = $rutas[0];
				$infoproducto = ControladorProductos::ctrMostrarInfoProducto($item, $valor);

				$multimedia = json_decode($infoproducto["multimedia"],true);

			  echo '<button class="btn btn-default btn-block btn-lg backColor agregarPago" idProducto="'
							.$infoproducto["id"].'" idUsuario="'.$_SESSION["id"].'" tipo="'.$infoproducto["tipo"].'" titulo="'
							.$infoproducto["titulo"].'">COMPRAR AHORA</button>';
			};
			?>
			  
            </fieldset>
          </form>
          <!-- <script src="script.js"></script> -->

		  <div class="contenidoPagoExitoso" style="display:none;">
          
        </div>
        </div>

        

      </div> <!-- cierre de modal-body -->

    </div> <!-- cierre de modal-content -->
  </div> <!-- cierre de modal-dialog -->
</div> <!-- cierre de modal -->





















<?php

require_once "../modelos/rutas.php";
require_once "../modelos/carrito.modelo.php";

use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class Paypal{

	static public function mdlPagoPaypal($datos){

		require __DIR__ . '/bootstrap.php';

		$tituloArray = explode(",", $datos["tituloArray"]);
		$cantidadArray = explode(",", $datos["cantidadArray"]);
		$valorItemArray = explode(",", $datos["valorItemArray"]);
		$idProductos = str_replace(",","-", $datos["idProductoArray"]);
		$cantidadProductos = str_replace(",","-", $datos["cantidadArray"]);
		$pagoProductos = str_replace(",","-", $datos["valorItemArray"]);

		#Seleccionamos el método de pago
		$payer = new Payer();
		$payer->setPaymentMethod("paypal");

		$item = array();
		$variosItem = array();

		for($i = 0; $i < count($tituloArray); $i ++){

			$item[$i] = new Item();
			$item[$i]->setName($tituloArray[$i])
				    ->setQuantity($cantidadArray[$i])
				    ->setPrice($valorItemArray[$i]/$cantidadArray[$i]);

				    array_push($variosItem, $item[$i]);
		}

		#Agrupamos los items en una lista de ITEMS
		$itemList = new ItemList();
		$itemList->setItems($variosItem);

		#Agregamos los detalles del pago: impuestos, envíos...etc
		$details = new Details();
		$details->setShipping($datos["envio"])
   				->setTax($datos["impuesto"])
    			->setSubtotal($datos["subtotal"]);

    	#definimos el pago total con sus detalles
    	$amount = new Amount();
		$amount ->setTotal($datos["total"])
		    	->setDetails($details);	

		#Agregamos las características de la transacción
    	$transaction = new Transaction();
		$transaction->setAmount($amount)
    				->setItemList($itemList)
    				->setDescription("Payment description")
    				->setInvoiceNumber(uniqid());

    	#Agregamos las URL'S después de realizar el pago, o cuando el pago es cancelado
		#Importante agregar la URL principal en la API developers de Paypal
    	$url = Ruta::ctrRuta();

		$redirectUrls = new RedirectUrls();
		$redirectUrls->setReturnUrl("$url/index.php?ruta=finalizar-compra&paypal=true&productos=".$idProductos."&cantidad=".$cantidadProductos."&pago=".$pagoProductos)
   				     ->setCancelUrl("$url/carrito-de-compras");

   		#Agregamos todas las características del pago
   		$payment = new Payment();
		$payment->setIntent("sale")
			    ->setPayer($payer)
			    ->setRedirectUrls($redirectUrls)
			    ->setTransactions(array($transaction));

		#Tratar de ejcutar un proceso y si falla ejecutar una rutina de error
		try {
		    // traemos las credenciales $apiContext
		    $payment->create($apiContext);   
		   
		}
		catch(){

			echo $ex->getCode(); // Prints the Error Code
			echo $ex->getData(); // Prints the detailed error message 
			die($ex);
			return "$url/error";

		}

		# utilizamos un foreach para iterar sobre $payment, utilizamos el método llamado getLinks() para obtener todos los enlaces que aparecen en el array $payment y caso de que $Link->getRel() coincida con 'approval_url' extraemos dicho enlace, finalmente enviamos al usuario a esa dirección que guardamos en la variable $redirectUrl on el método getHref();

		foreach ($payment->getLinks() as $link) {
			
			if($link->getRel() == "approval_url"){

				$redirectUrl = $link->getHref();
			}
		}

		return $redirectUrl;
	}

}




























<?php
    if(isset($_SESSION["validarSesion"]) && $_SESSION["validarSesion"] == "ok"){

        $item =  "ruta";
        $valor = $rutas[0];
        $infoproducto = ControladorProductos::ctrMostrarInfoProducto($item, $valor);

        $multimedia = json_decode($infoproducto["multimedia"],true);

        echo '<button class="btn btn-default btn-block btn-lg backColor agregarPago" idProducto="'
                    .$infoproducto["id"].'" idUsuario="'.$_SESSION["id"].'" tipo="'.$infoproducto["tipo"].'" titulo="'
                    .$infoproducto["titulo"].'">COMPRAR AHORA</button>';
    };
?>