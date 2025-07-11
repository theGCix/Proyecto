-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2025 a las 07:19:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `email` text NOT NULL,
  `foto` text NOT NULL,
  `password` text NOT NULL,
  `perfil` text NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `foto`, `password`, `perfil`, `estado`, `fecha`) VALUES
(1, 'Tienda Virtual', 'admin@tiendavirtual.com', 'vistas/img/perfiles/499.png', 'admin', 'administrador', 1, '2018-03-27 18:48:36'),
(2, 'Editor de la Tienda', 'editor@tiendavirtual.com', 'vistas/img/perfiles/646.png', 'editor', 'editor', 1, '2021-10-06 21:05:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `ruta` text NOT NULL,
  `tipo` text NOT NULL,
  `img` text NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `banner`
--

INSERT INTO `banner` (`id`, `ruta`, `tipo`, `img`, `estado`, `fecha`) VALUES
(1, 'sin-categoria', 'sin-categoria', 'vistas/img/banner/default.jpg', 1, '2018-03-26 13:29:51'),
(3, 'desarrollo-web', 'subcategorias', 'vistas/img/banner/web.jpg', 1, '2018-03-26 15:05:48'),
(4, 'calzado', 'categorias', 'vistas/img/banner/ropaHombre.jpg', 1, '2018-03-26 15:46:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cabeceras`
--

CREATE TABLE `cabeceras` (
  `id` int(11) NOT NULL,
  `ruta` text NOT NULL,
  `titulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `palabrasClaves` text NOT NULL,
  `portada` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cabeceras`
--

-- INSERT INTO `cabeceras` (`id`, `ruta`, `titulo`, `descripcion`, `palabrasClaves`, `portada`, `fecha`) VALUES
-- (1, 'inicio', 'Tienda Virtual', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam accusantium enim esse eos officiis sit officia', 'Lorem ipsum, dolor sit amet, consectetur, adipisicing, elit, Quisquam, accusantium, enim, esse', 'vistas/img/cabeceras/default.jpg', '2017-11-17 14:58:16'),
-- (2, 'desarrollo-web', 'Desarrollo Web', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam accusantium enim esse eos officiis sit officia', 'Lorem ipsum, dolor sit amet, consectetur, adipisicing, elit, Quisquam, accusantium, enim, esse', 'vistas/img/cabeceras/web.jpg', '2017-11-17 14:59:28'),
-- (7, 'aaa', 'aaa', 'aaa', 'aaaa', 'vistas/img/cabeceras/aaa.jpg', '2025-05-23 15:55:55'),
-- (8, 'muebles-para-sala', 'MUEBLES PARA SALA', 'Muebles para sala', 'sala', 'vistas/img/cabeceras/default/default.jpg', '2025-05-26 17:27:28'),
-- (10, 'juego-de-mueble-3-2-1', 'Juego de mueble 3 2 1', 'Juego de muebles para sala modelo vintage en tela nacional\r\n6 cojines', 'vintage', 'vistas/img/cabeceras/juego-de-mueble-3-2-1.jpg', '2025-05-23 17:18:04'),
-- (11, 'juego-de-mueble-modelo-london', 'Juego de mueble modelo london', 'Juego de mueble para sala modelo london en tela nacional\r\n6 cojines\r\n4 pulgadas por cojin', 'london', 'vistas/img/cabeceras/juego-de-mueble-modelo-london.jpg', '2025-05-23 17:31:51'),
-- (12, 'muebles-para-departamento', 'MUEBLES PARA DEPARTAMENTO', 'DEPARTAMENTO', 'departamento', 'vistas/img/cabeceras/default/default.jpg', '2025-05-26 17:27:19'),
-- (13, 'comedores', 'COMEDORES', 'COMEDORES', 'COMEDORES', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:40:09'),
-- (14, 'separador-de-ambiente', 'SEPARADOR DE AMBIENTE', 'SEPARADOR DE AMBIENTE', 'SEPARADOR DE AMBIENTE', 'vistas/img/cabeceras/default/default.jpg', '2025-05-26 17:23:49'),
-- (16, 'london', 'London', 'London', 'London', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:42:23'),
-- (17, 'lineal-3-piezas', 'Lineal 3 piezas', 'Lineal 3 piezas', 'Lineal 3 piezas', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:42:39'),
-- (18, 'lineal-5-piezas', 'Lineal 5 piezas', 'Lineal 5 piezas', 'Lineal 5 piezas', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:42:51'),
-- (19, 'garra', 'Garra', 'Garra', 'Garra', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:43:01'),
-- (20, 'estante-para-tv-con-rack', 'Estante para TV con rack', 'Estante para TV con rack', 'Estante para TV con rack', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:43:29'),
-- (21, 'comedor-4-sillas', 'Comedor 4 sillas', 'Comedor 4 sillas', 'Comedor 4 sillas', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:43:45'),
-- (22, 'comedor-6-sillas', 'Comedor 6 sillas', 'Comedor 6 sillas', 'Comedor 6 sillas', 'vistas/img/cabeceras/default/default.jpg', '2025-05-23 17:43:57'),
-- (24, 'juego-de-mueble-lineal', 'Juego de mueble lineal', 'Juego de muebles modelo lineal 5 piezas', 'lineal 5 piezas', 'vistas/img/cabeceras/juego-de-mueble-lineal.jpg', '2025-05-23 17:45:54'),
-- (26, 'mueble-vintage', 'Mueble vintage', 'Juego de mueble modelo vintage', 'vintage', 'vistas/img/cabeceras/mueble-vintage.jpg', '2025-05-26 02:47:27'),
-- (27, 'zapaton', 'Zapaton', 'Zapaton', 'Zapaton', 'vistas/img/cabeceras/default/default.jpg', '2025-05-26 17:28:23'),
-- (28, 'juego-de-muebles-modelo-lineal-5-piezas', 'Juego de muebles modelo lineal 5 piezas', 'Juego de muebles para sala modelo lineal 5 piezas\r\n10 cojines de 5 pulgadas\r\n4 banquetas\r\n\r\n2 años de garantia', 'lineal 5 piezas', 'vistas/img/cabeceras/juego-de-muebles-modelo-lineal-5-piezas.jpg', '2025-05-26 17:32:20'),
-- (30, 'prueba', 'prueba', '1111', '1111', 'vistas/img/cabeceras/prueba.jpg', '2025-05-26 17:38:24'),
-- (31, 'prueba-2', 'prueba 2', 'aaaa', 'qaaa', 'vistas/img/cabeceras/prueba-2.jpg', '2025-05-26 17:39:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` text NOT NULL,
  `ruta` text NOT NULL,
  `estado` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `precioOferta` float NOT NULL,
  `descuentoOferta` int(11) NOT NULL,
  `imgOferta` text NOT NULL,
  `finOferta` datetime NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`, `ruta`, `estado`, `oferta`, `precioOferta`, `descuentoOferta`, `imgOferta`, `finOferta`, `fecha`) VALUES
(8, 'MUEBLES PARA SALA', 'muebles-para-sala', 1, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-26 17:27:28'),
(9, 'MUEBLES PARA DEPARTAMENTO', 'muebles-para-departamento', 1, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-26 17:27:19'),
(10, 'COMEDORES', 'comedores', 1, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:40:09'),
(11, 'SEPARADOR DE AMBIENTE', 'separador-de-ambiente', 1, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-26 17:23:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `calificacion` float NOT NULL,
  `comentario` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_usuario`, `id_producto`, `calificacion`, `comentario`, `fecha`) VALUES
(1, 86, 496, 3.5, 'Lo mejor de PHP', '2018-02-13 16:39:25'),
(2, 86, 464, 4.5, 'Excelente', '2018-02-13 15:55:14'),
(3, 87, 496, 4, 'El curso es muy bueno, pero puede ser mejor.', '2018-02-13 16:10:50'),
(4, 88, 496, 4.5, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\n		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur', '2018-02-13 17:17:48'),
(6, 5, 496, 2, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\n		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. ', '2018-02-13 17:21:30'),
(7, 12, 500, 0, '', '2018-03-27 23:19:33'),
(8, 15, 185, 0, '', '2021-09-30 21:35:43'),
(9, 15, 402, 0, '', '2021-09-30 21:35:43'),
(10, 15, 498, 0, '', '2021-09-30 22:11:52'),
(11, 15, 185, 0, '', '2021-09-30 22:11:52'),
(12, 15, 2, 0, '', '2021-10-04 17:29:16'),
(13, 15, 497, 0, '', '2021-10-04 17:29:17'),
(14, 15, 459, 0, '', '2021-10-04 18:40:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercio`
--

CREATE TABLE `comercio` (
  `id` int(11) NOT NULL,
  `impuesto` float NOT NULL,
  `envioNacional` float NOT NULL,
  `envioInternacional` float NOT NULL,
  `tasaMinimaNal` float NOT NULL,
  `tasaMinimaInt` float NOT NULL,
  `pais` text NOT NULL,
  `modoPaypal` text NOT NULL,
  `clienteIdPaypal` text NOT NULL,
  `llaveSecretaPaypal` text NOT NULL,
  `modoPayu` text NOT NULL,
  `merchantIdPayu` int(11) NOT NULL,
  `accountIdPayu` int(11) NOT NULL,
  `apiKeyPayu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `comercio`
--

INSERT INTO `comercio` (`id`, `impuesto`, `envioNacional`, `envioInternacional`, `tasaMinimaNal`, `tasaMinimaInt`, `pais`, `modoPaypal`, `clienteIdPaypal`, `llaveSecretaPaypal`, `modoPayu`, `merchantIdPayu`, `accountIdPayu`, `apiKeyPayu`) VALUES
(1, 19, 1, 2, 10, 15, 'MX', 'sandbox', 'AecffvSZfOgj6g1MkrVmz12ACMES2-InggmWCpU5CblR-z5WwkYBYjmLsh9yPRLuRape1ahjqpcJet4N', 'EAx1SVMHGV6MJKwl-pnOSzaJASlAINZdYRdS--wkgaPYLevcGw88V0PU_W_rg00xLkBknybCjsO_xzA0', 'sandbox', 508029, 512321, '4Vj8eK4rloUd272L48hsrarnUA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `envio` int(11) NOT NULL,
  `metodo` text NOT NULL,
  `email` text NOT NULL,
  `direccion` text NOT NULL,
  `pais` text NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle` text DEFAULT NULL,
  `pago` float NOT NULL DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `id_usuario`, `id_producto`, `envio`, `metodo`, `email`, `direccion`, `pais`, `cantidad`, `detalle`, `pago`, `fecha`) VALUES
(25, 15, 498, 0, 'paypal', 'tutorialesatualcance-buyer@hotmail.com', '1 Main St, San Jose, CA, 95131', 'US', 1, 'Curso de jQuery', 9.99, '2021-05-30 22:11:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deseos`
--

CREATE TABLE `deseos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `deseos`
--

INSERT INTO `deseos` (`id`, `id_usuario`, `id_producto`, `fecha`) VALUES
(1, 9, 469, '2018-03-26 22:03:34'),
(2, 9, 469, '2018-03-26 22:03:35'),
(3, 9, 467, '2018-03-26 22:03:39'),
(4, 9, 3, '2018-03-26 22:03:43'),
(5, 9, 469, '2018-03-26 22:03:54'),
(6, 9, 470, '2018-03-26 22:03:57'),
(7, 9, 467, '2018-03-26 22:04:00'),
(8, 9, 4, '2018-03-26 22:04:37'),
(9, 17, 468, '2021-09-30 14:55:54'),
(10, 17, 468, '2021-09-30 14:55:55'),
(11, 17, 467, '2021-09-30 14:56:00'),
(12, 17, 469, '2021-09-30 14:56:02'),
(13, 17, 470, '2021-09-30 14:56:04'),
(14, 17, 469, '2021-09-30 14:56:09'),
(15, 17, 469, '2021-09-30 14:56:11'),
(16, 17, 469, '2021-09-30 14:56:11'),
(17, 17, 468, '2021-09-30 14:56:13'),
(18, 17, 467, '2021-09-30 14:56:14'),
(19, 17, 2, '2021-09-30 14:56:16'),
(20, 17, 3, '2021-09-30 14:56:17'),
(21, 17, 4, '2021-09-30 14:56:18'),
(22, 17, 459, '2021-09-30 14:56:36'),
(23, 17, 459, '2021-09-30 14:56:37'),
(24, 17, 470, '2021-09-30 14:56:57'),
(25, 2, 3, '2025-05-26 16:29:54'),
(26, 2, 3, '2025-05-27 23:26:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `nuevosUsuarios` int(11) NOT NULL,
  `nuevasVentas` int(11) NOT NULL,
  `nuevasVisitas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `nuevosUsuarios`, `nuevasVentas`, `nuevasVisitas`) VALUES
(1, 1, 7, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantilla`
--

CREATE TABLE `plantilla` (
  `id` int(11) NOT NULL,
  `barraSuperior` text NOT NULL,
  `textoSuperior` text NOT NULL,
  `colorFondo` text NOT NULL,
  `colorTexto` text NOT NULL,
  `logo` text NOT NULL,
  `icono` text NOT NULL,
  `redesSociales` text NOT NULL,
  `apiFacebook` text NOT NULL,
  `pixelFacebook` text NOT NULL,
  `googleAnalytics` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `plantilla`
--

INSERT INTO `plantilla` (`id`, `barraSuperior`, `textoSuperior`, `colorFondo`, `colorTexto`, `logo`, `icono`, `redesSociales`, `apiFacebook`, `pixelFacebook`, `googleAnalytics`, `fecha`) VALUES
(1, '#000000', '#ffffff', '#47bac1', '#ffffff', 'vistas/img/plantilla/logo.png', 'vistas/img/plantilla/icono.png', '[{\"red\":\"fa-facebook\",\"estilo\":\"facebookBlanco\",\"url\":\"http://facebook.com/\",\"activo\":1},{\"red\":\"fa-youtube\",\"estilo\":\"youtubeBlanco\",\"url\":\"http://youtube.com/\",\"activo\":1},{\"red\":\"fa-twitter\",\"estilo\":\"twitterBlanco\",\"url\":\"http://twitter.com/\",\"activo\":1},{\"red\":\"fa-google-plus\",\"estilo\":\"google-plusBlanco\",\"url\":\"\",\"activo\":0},{\"red\":\"fa-instagram\",\"estilo\":\"instagramBlanco\",\"url\":\"http://instagram.com/\",\"activo\":1}]', '<script>   window.fbAsyncInit = function() {     FB.init({       appId      : \'906739113551889\',       cookie     : true,       xfbml      : true,       version    : \'v2.10\'     });            FB.AppEvents.logPageView();             };    (function(d, s, id){      var js, fjs = d.getElementsByTagName(s)[0];      if (d.getElementById(id)) {return;}      js = d.createElement(s); js.id = id;      js.src = \"https://connect.facebook.net/en_US/sdk.js\";      fjs.parentNode.insertBefore(js, fjs);    }(document, \'script\', \'facebook-jssdk\'));  </script>', '<!-- Facebook Pixel Code --> 	<script> 	  !function(f,b,e,v,n,t,s) 	  {if(f.fbq)return;n=f.fbq=function(){n.callMethod? 	  n.callMethod.apply(n,arguments):n.queue.push(arguments)}; 	  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\'; 	  n.queue=[];t=b.createElement(e);t.async=!0; 	  t.src=v;s=b.getElementsByTagName(e)[0]; 	  s.parentNode.insertBefore(t,s)}(window, document,\'script\', 	  \'https://connect.facebook.net/en_US/fbevents.js\'); 	  fbq(\'init\', \'131737410786111\'); 	  fbq(\'track\', \'PageView\'); 	</script> 	<noscript><img height=\"1\" width=\"1\" style=\"display:none\" 	  src=\"https://www.facebook.com/tr?id=149877372404434&ev=PageView&noscript=1\" 	/></noscript> <!-- End Facebook Pixel Code -->', '<!-- Global site tag (gtag.js) - Google Analytics --> 	<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-999999-1\"></script> 	<script> 	  window.dataLayer = window.dataLayer || []; 	  function gtag(){dataLayer.push(arguments);} 	  gtag(\'js\', new Date());  	  gtag(\'config\', \'UA-9999999-1\'); 	</script>', '2021-10-04 19:34:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_subcategoria` int(11) NOT NULL,
  `tipo` text NOT NULL,
  `ruta` text NOT NULL,
  `estado` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `titular` text NOT NULL,
  `descripcion` text NOT NULL,
  `multimedia` text NOT NULL,
  `detalles` text NOT NULL,
  `precio` float NOT NULL,
  `portada` text NOT NULL,
  `vistas` int(11) NOT NULL,
  `ventas` int(11) NOT NULL,
  `vistasGratis` int(11) NOT NULL,
  `ventasGratis` int(11) NOT NULL,
  `ofertadoPorCategoria` int(11) NOT NULL,
  `ofertadoPorSubCategoria` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `precioOferta` float NOT NULL,
  `descuentoOferta` int(11) NOT NULL,
  `imgOferta` text NOT NULL,
  `finOferta` datetime NOT NULL,
  `peso` float NOT NULL,
  `entrega` float NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `id_categoria`, `id_subcategoria`, `tipo`, `ruta`, `estado`, `titulo`, `titular`, `descripcion`, `multimedia`, `detalles`, `precio`, `portada`, `vistas`, `ventas`, `vistasGratis`, `ventasGratis`, `ofertadoPorCategoria`, `ofertadoPorSubCategoria`, `oferta`, `precioOferta`, `descuentoOferta`, `imgOferta`, `finOferta`, `peso`, `entrega`, `fecha`) VALUES
(3, 8, 23, 'fisico', 'mueble-vintage', 1, 'Mueble vintage', 'Juego de mueble modelo vintage...', 'Juego de mueble modelo vintage', '[{\"foto\":\"vistas/img/multimedia/mueble-vintage/WhatsApp Image 2025-05-22 at 10.40.43 AM (3).jpeg\"}]', '{\"Talla\":[\"12\"],\"Color\":[\"Gris\"],\"Marca\":[\"vintage\"]}', 1500, 'vistas/img/productos/mueble-vintage.jpg', 12, 0, 0, 0, 0, 0, 0, 0, 0, '', '0000-00-00 00:00:00', 0, 0, '2025-05-27 23:27:00'),
(6, 8, 27, 'fisico', 'prueba', 1, 'prueba', '1111...', '1111', '[{\"foto\":\"vistas/img/multimedia/prueba/WhatsApp Image 2025-05-22 at 10.40.42 AM.jpeg\"}]', '{\"Talla\":[\"12\"],\"Color\":[\"12\"],\"Marca\":[\"12\"]}', 11111, 'vistas/img/productos/prueba.jpg', 4, 0, 0, 0, 0, 0, 0, 0, 0, '', '0000-00-00 00:00:00', 0, 0, '2025-05-27 23:26:50'),
(7, 8, 27, 'fisico', 'prueba-2', 1, 'prueba 2', 'aaaa...', 'aaaa', '[{\"foto\":\"vistas/img/multimedia/prueba-2/WhatsApp Image 2025-05-22 at 10.40.42 AM.jpeg\"}]', '{\"Talla\":[\"111\"],\"Color\":[\"111\"],\"Marca\":[\"111\"]}', 2000, 'vistas/img/productos/prueba-2.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, '', '0000-00-00 00:00:00', 0, 0, '2025-05-26 17:39:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `slide`
--

CREATE TABLE `slide` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `imgFondo` text NOT NULL,
  `tipoSlide` text NOT NULL,
  `imgProducto` text NOT NULL,
  `estiloImgProducto` text NOT NULL,
  `estiloTextoSlide` text NOT NULL,
  `titulo1` text NOT NULL,
  `titulo2` text NOT NULL,
  `titulo3` text NOT NULL,
  `boton` text NOT NULL,
  `url` text NOT NULL,
  `orden` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `slide`
--

INSERT INTO `slide` (`id`, `nombre`, `imgFondo`, `tipoSlide`, `imgProducto`, `estiloImgProducto`, `estiloTextoSlide`, `titulo1`, `titulo2`, `titulo3`, `boton`, `url`, `orden`, `fecha`) VALUES
(9, '', 'vistas/img/slide/slide9/fondo.jpg', 'slideOpcion1', '', '{\"top\":\"\",\"right\":\"\",\"left\":\"\",\"width\":\"\"}', '{\"top\":\"20\",\"right\":\"\",\"left\":\"15\",\"width\":\"40\"}', '{\"texto\":\"\",\"color\":\"#333\"}', '{\"texto\":\"\",\"color\":\"#777\"}', '{\"texto\":\"\",\"color\":\"#888\"}', '', '#', 7, '2025-05-27 23:10:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategorias`
--

CREATE TABLE `subcategorias` (
  `id` int(11) NOT NULL,
  `subcategoria` text NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `ruta` text NOT NULL,
  `estado` int(11) NOT NULL,
  `ofertadoPorCategoria` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `precioOferta` float NOT NULL,
  `descuentoOferta` int(11) NOT NULL,
  `imgOferta` text NOT NULL,
  `finOferta` datetime NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `subcategorias`
--

INSERT INTO `subcategorias` (`id`, `subcategoria`, `id_categoria`, `ruta`, `estado`, `ofertadoPorCategoria`, `oferta`, `precioOferta`, `descuentoOferta`, `imgOferta`, `finOferta`, `fecha`) VALUES
(23, 'Vintage', 8, 'vintage', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:16:34'),
(25, 'London', 8, 'london', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:42:23'),
(26, 'Lineal 3 piezas', 9, 'lineal-3-piezas', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:42:39'),
(27, 'Lineal 5 piezas', 8, 'lineal-5-piezas', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:42:51'),
(28, 'Garra', 8, 'garra', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:43:01'),
(29, 'Estante para TV con rack', 11, 'estante-para-tv-con-rack', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:43:29'),
(30, 'Comedor 4 sillas', 10, 'comedor-4-sillas', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:43:45'),
(31, 'Comedor 6 sillas', 10, 'comedor-6-sillas', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:43:57'),
(32, 'Comedor 8 sillas', 10, 'comedor-8-sillas', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-23 17:44:18'),
(33, 'Zapaton', 8, 'zapaton', 1, 0, 0, 0, 0, '', '0000-00-00 00:00:00', '2025-05-26 17:28:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `modo` text NOT NULL,
  `foto` text NOT NULL,
  `verificacion` int(11) NOT NULL,
  `emailEncriptado` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `password`, `email`, `modo`, `foto`, `verificacion`, `emailEncriptado`, `fecha`) VALUES
(2, 'Giancarlo Ruiz', '123', 'thegcix@gmail.com', 'directo', 'vistas/img/usuarios/2/309.png', 0, '', '2025-05-26 16:31:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitaspaises`
--

CREATE TABLE `visitasdistritos` (
  `id` int(11) NOT NULL,
  `distrito` text NOT NULL,
  `codigo` text NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `visitaspaises`
--

INSERT INTO `visitaspaises` (`id`, `pais`, `codigo`, `cantidad`, `fecha`) VALUES
(1, 'United States', 'US', 2, '2017-12-05 21:02:46'),
(2, 'Japan', 'JP', 69, '2021-10-05 14:39:27'),
(3, 'Spain', 'ES', 10, '2017-12-05 21:02:53'),
(4, 'Colombia', 'CO', 5, '2017-12-05 21:02:55'),
(5, 'China', 'CN', 3, '2017-12-05 21:04:32'),
(6, 'Germany', 'DE', 34, '2017-12-05 21:04:39'),
(7, 'Mexico', 'MX', 8, '2017-12-05 21:04:41'),
(8, 'Unknown', 'NK', 7, '2025-05-27 18:48:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitaspersonas`
--

CREATE TABLE `visitaspersonas` (
  `id` int(11) NOT NULL,
  `ip` text NOT NULL,
  `distrito` text NOT NULL,
  `visitas` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `visitaspersonas`
--

INSERT INTO `visitaspersonas` (`id`, `ip`, `pais`, `visitas`, `fecha`) VALUES
(100, '153.202.197.216', 'Carabayllo', 1, '2017-11-08 18:37:07'),
(101, '::1', 'Carabayllo', 1, '2025-05-23 15:56:21'),
(102, '::1', 'Ancón', 1, '2025-05-25 23:00:47'),
(103, '127.0.0.1', 'Ancón', 1, '2025-05-25 23:12:23'),
(104, '::1', 'Breña', 1, '2025-05-26 15:43:00'),
(105, '::1', 'Breña', 1, '2025-05-27 18:48:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cabeceras`
--
ALTER TABLE `cabeceras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercio`
--
ALTER TABLE `comercio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `deseos`
--
ALTER TABLE `deseos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plantilla`
--
ALTER TABLE `plantilla`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitaspaises`
--
ALTER TABLE `visitaspaises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitaspersonas`
--
ALTER TABLE `visitaspersonas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cabeceras`
--
ALTER TABLE `cabeceras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `comercio`
--
ALTER TABLE `comercio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `deseos`
--
ALTER TABLE `deseos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `plantilla`
--
ALTER TABLE `plantilla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `slide`
--
ALTER TABLE `slide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `visitaspaises`
--
ALTER TABLE `visitaspaises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `visitaspersonas`
--
ALTER TABLE `visitaspersonas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
