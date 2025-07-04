 <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script> -->
      
<?php


require_once "modelos/carrito.modelo.php";
$servidor = Ruta::ctrRutaServidor();
$url = Ruta::ctrRuta();



?>



<!--=====================================
BREADCRUMB CARRITO DE COMPRAS
======================================-->

<div class="container-fluid well well-sm">
	
	<div class="container">
		
		<div class="row">
			
			<ul class="breadcrumb fondoBreadcrumb text-uppercase">
				
				<li><a href="<?php echo $url;  ?>">CARRITO DE COMPRAS</a></li>
				<li class="active pagActiva"><?php echo $rutas[0] ?></li>

			</ul>

		</div>

	</div>

</div>

<!--=====================================
TABLA CARRITO DE COMPRAS
======================================-->

<div class="container-fluid">

	<div class="container">

		<div class="panel panel-default">
			
			<!--=====================================
			CABECERA CARRITO DE COMPRAS
			======================================-->

			<div class="panel-heading cabeceraCarrito">
				
				<div class="col-md-6 col-sm-7 col-xs-12 text-center">
					
					<h3>
						<small>PRODUCTO</small>
					</h3>

				</div>

				<div class="col-md-2 col-sm-1 col-xs-0 text-center">
					
					<h3>
						<small>PRECIO</small>
					</h3>

				</div>

				<div class="col-sm-2 col-xs-0 text-center">
					
					<h3>
						<small>CANTIDAD</small>
					</h3>

				</div>

				<div class="col-sm-2 col-xs-0 text-center">
					
					<h3>
						<small>SUBTOTAL</small>
					</h3>

				</div>

			</div>

			<!--=====================================
			CUERPO CARRITO DE COMPRAS
			======================================-->

			<div class="panel-body cuerpoCarrito">

				

			</div>


      <div class="segundocuerpo">

      </div>

			<!--=====================================
			SUMA DEL TOTAL DE PRODUCTOS
			======================================-->

			<div class="panel-body sumaCarrito">

				<div class="col-md-4 col-sm-6 col-xs-12 pull-right well">
					
					<div class="col-xs-6">
						
						<h4>TOTAL:</h4>

					</div>

					<div class="col-xs-6">

						<h4 class="sumaSubTotal">
							
							

						</h4>

					</div> 

				</div>

			</div>

			<!--=====================================
			BOTÓN CHECKOUT
			======================================-->
			<div class="panel-heading cabeceraCheckout">
        <button class="btn btn-default backColor btn-lg pull-right btnPagoExitoso">
            REALIZAR PAGO 1
          </button>


          <a id="btnCheckout"
          href="#modalCheckout"
          data-toggle="modal"
          >
          <!-- <button class="btn btn-default backColor btn-lg pull-right btnPagoExitoso">
            REALIZAR PAGO 1
          </button> -->
        </a>
			</div>
		</div>
	</div>
</div>


<div class="modal fade" id="modalCheckout">
  

      <!-- <div class="modal-header">
        <h4 class="modal-title">Confirmar Pago</h4>
      </div> -->

      <!-- <div class="modal-body">
        <p><strong>Producto:</strong> <span id="checkoutTitulo"></span></p>
        <p><strong>Precio:</strong> S/. <span id="checkoutPrecio"></span></p>

        <input type="hidden" id="inputUsuario">
        <input type="hidden" id="inputTitulo">
        <input type="hidden" id="inputPrecio">
      </div> -->

      <!-- <div class="modal-footer">
        <button type="button" id="btnConfirmarPago" class="btn btn-success">Pagar</button>
      </div> -->

    
</div>



<!--=====================================
VENTANA MODAL PARA CHECKOUT
======================================-->
<!-- <div id="modalCheckout" class="modal fade modalFormulario" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
        
      <div class="modal-body modalTitulo">
        <<h3 class="backColor btnRealizarPago">REALIZAR PAGO</h3> -->
        <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->

        

        <!-- <div class="contenidoPagoFinal" style="display:none;">
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
			
			  
            </fieldset>
          </form>

		  <div class="contenidoPagoExitoso" style="display:none;">
          
      </div>
        </div> -->

        

      </div> 

    </div> 
  </div> 
</div> 






<!-- PASARELA DE PAGO
<div id="pasarelaPago" class="modal fade modalFormulario" role="dialog">

</div> -->
