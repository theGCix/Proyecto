<!DOCTYPE html>
<html lang="es">
    <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script>
      <link rel="stylesheet" href="style.css">
      <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/imask/3.4.0/imask.min.js"  >
      <link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"  > -->
       

     
    </head>
 <body>
  <form id="msform">
    <!-- progressbar -->
    <ul id="progressbar">
      <li class="active">Medio de Pago</li>
      <li>Datos de Tarjeta</li>
      <li>Pagar</li>
    </ul>
    <!-- fieldsets -->
    <fieldset>
      <h2 class="fs-title">Vas a Pagar</h2>
      <div id="details">
      <p>Item: Item</p>
      <p>Descripción: Descripcion</p>
      <p>Monto: S/ 1200</p>
    </div>
      <h3 class="fs-subtitle">Selecciona el Medio de Pago</h3>
      <!--<input type="text" name="email" placeholder="Email" />
      <input type="password" name="pass" placeholder="Password" />
      <input type="password" name="cpass" placeholder="Confirm Password" />-->
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
      <p>Item: Item</p>
      <p>Descripción: Descripcion</p>
      <p>Monto: S/ 1200</p>
      <p>Tarjeta Nro: 4512*********2365</p>
      <input type="button" name="previous" class="previous action-button" value="Volver" />
      <input type="submit" name="submit" class="submit action-button" value="Pagar" />
    </fieldset>
  </form>
</body> <script src="script.js"></script>
 <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> -->
</html>
