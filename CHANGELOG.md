# Changelog

Todos los cambios hechos en el proyecto serán documentados en este archivo de cambios.

## [Unreleased](https://github.com/jesuspoleo18/tumiMexico/commits/master)

## [1.0.5](https://github.com/jesuspoleo18/tumiMexico/releases/tag/v1.0.5) - 2018-04-04

### Added

#### 2018-04-04

* Se agregó la funcionalidad para que el nombre de la colección del producto redirija a la colección padre del producto.

### Changed

#### 2018-04-04 al 2018-04-05

* Resuelto el por qué al entrar desde el SKU en la vista de vitrina la API arroja una instrucción incorrecta y no se cambia el texto del stock, la función que se encargaba de comprar ésto, no se ejecutaba al cargar la página.
* Revisión del account/orders a fondo, sacar detalles de traducciones, scripts que no deban ejecutarse y diseño sin estilar según línea de diseño de la marca.
* Revisión de por qué la colección '19 degree aluminum' no está en el menú de 'colecciones'.
* Activación de selector de SKU en versiones móviles.
* La colección 'Latitud' que está en el menu de 'colecciones' nos lleva a resultado de busqueda vacía, se ocultó temporalmente.
* Revisamos por qué ciertas colecciones no están indexadas en VTEX.
* La imagen de este producto'Chaqueta de plumon plegable Negro' no estaba cargando, se solucionó con la republicación del catálogo.
* Los nombres sobre las colecciones en el landing de 'colecciones' al tener estado 'visited' o 'focus' cambia a negro. Ahora está corregido. 
* Revisar los titles de las páginas ya que en algunos salía el nombre de lipault.
* Se ajustó estéticamente el menú de colecciones similar al de tumi.com
* Revisión de carrito abandonado, estilado y redirección de compra.
* Revisión de fecha de entrega en 'Pedido aprobado' y 'Pedido enviado'.
* La función 'skuOnLoad' de la ficha de producto y del quickview sufrieron modificaciones para que al entrar desde la vista catálogo no seleccionara inmediatamente el primer SKU que pinta el controlador de vtex.

## [1.0.4](https://github.com/jesuspoleo18/tumiMexico/releases/tag/v1.0.4) - 2018-03-28

### Added

#### 2018-03-28

* Creación de script que discrimina si estás en home on vista de catálogo para añadir la colección consultada por API según id de producto.

### Changed

* Modificación de tipografías generales del sitio.
* Ajustes generales de css.
* Ajuste de Css para ficha de producto según resolución 1536w.

#### 2018-03-28

## [1.0.3](https://github.com/jesuspoleo18/tumiMexico/releases/tag/v1.0.3) - 2018-03-18

### Added

#### 2018-03-18

--

### Changed

#### 2018-03-18

* El menu de "ver todos" en el menu offcanvas de "viajes" seguía redirigiendo a una página incorrecta. Fue cambiado. **14:16pm | 2018-03-18**
* La línea gris sobre la categoría se ocultó. **14:16pm | 2018-03-18**
* Modificación de la función "noStock" para discriminar por tamaño de pantalla y no se vieran dos botones de compra en la ficha de producto. **14:48pm | 2018-03-18**
* Arreglo de las funciones que corregian los decimales y miles en la ficha de producto y el offcanvas minicart. **15:56pm | 2018-03-18**
* Mediaquerie de paginas estaticas para version mobile. **15:56pm | 2018-03-18**
* Modificacion del script que ejecuta el sidebar lateral en paginas estaticas para que solo funcione sobre dispositivos moviles. **15:56pm | 2018-03-18**

### Pending

* Crear dos popUp, uno de entrada("newsletter") y uno de salida ("high on demand")
* Arreglar el mal display de los colores en el filtro lateral
<!-- * Activar los decimales -->
<!-- * Recordar Solicitar los accesos para el remitente del correo de soporte tumi -->


## [1.0.2](https://github.com/jesuspoleo18/tumiMexico/releases/tag/v1.0.2) - 2018-03-17

### Added

#### 2018-03-17

* Ajustes de css en indice de la hoja estilo sobre el codigo usado por AG para el login y el botón de compra en mobile **1:15am | 2018-03-17**
* Reforma de la sección de powerby y tecnología al final del website así como estilado y ajuste en dispositivos móviles **1:15am | 2018-03-17**
* Ajuste de banners en dispositivos tablet y display de productos en home **1:17am | 2018-03-17**

### Changed

--

### Pending

* Crear dos popUp, uno de entrada("newsletter") y uno de salida ("high on demand")
* Arreglar el mal display de los colores en el filtro lateral
* Activar los decimales
* Recordar Solicitar los accesos para el remitente del correo de soporte tumi

## [1.0.1](https://github.com/jesuspoleo18/tumiMexico/releases/tag/v1.0.1) - 2018-03-14

### Added

#### 2018-03-14

* Documentación de proyecto **10:00am | 2018-02-14**
* Configuración de templates y prateleria de CEM y Trigger de carrito abandonado **11:00am | 2018-02-14**
* Ocultar texto de disponibilidad de producto en ficha de producto, script **11:00am | 2018-02-14**
* Uso de los controladores para pintar el texto de los SKU dinámicamente en ficha de producto **11:00am | 2018-02-14**
* Arreglo de width para el campo de compra en el checkout **11:51am | 2018-02-14**
* Ajuste del script para quickview **11:00am | 2018-02-14**
* Correción de estilo para clases con cararáteres especiales "/" en skus **14:26pm | 2018-02-14**
* Desarrollo de script para que no se vieran más de 3 skus en vitrina y al fina se mostrase cuántos hay disponibles  **14:26pm | 2018-02-14**
* Ajuste de css para la guia área de carry on en mobile  **14:26pm | 2018-02-14**

### Changed

--

## [1.0.0](https://github.com/jesuspoleo18/tumiMexico/releases/tag/v1.0.0) - 2018-03-14

### Added

#### 2018-03-13

* Adición del contenido parcial de responsabilidad empresarial **10:14am | 2018-02-13**
* Se añadio el .js para nuestras tiendas así como también se creó el template y el placeholders. **18:38pm | 2018-02-13**
* Estilado de "nuestras tiendas" versión desktop. **18:38pm | 2018-02-13**

#### 2018-03-14

* Se añadió una función en el .js de "nuestras tiendas" para ocultar y mostrar el mapa en versiones mobiles así como también se añadío el css para versión mobiles **12:37pm | 2018-02-14**
* Desarrollo de función que permite consultar los sku de cada variante por producto en hover para la vista de catagoria/depto **18:54pm | 2018-02-14**
* Añadido script que consulta los eventos hash on change **18:54pm | 2018-02-14**

#### 2018-03-16

* Desarrollo del script que consulta las apis de vtex para traerse los datos de los SKUS en pintarlos en la vitrina con las urls de los skus **17:56pm | 2018-02-16**
* Desarrollo de script para modelado de imagenes en los botones checkbox de la vista de producto y ajuste de css **17:56pm | 2018-02-16**
* Estilado de accout, orders y checkout (andres guzman) **17:56pm | 2018-02-16**

#### 2018-03-20

* Se aplicó un truco aportado por los desarrolladores de tumiMX para cambiar el color del fondo de las imágenes **6:22pm | 2018-02-20**
* Traducciones para account **8:11pm | 2018-02-20**
* Se añadió las carpetas de Concatenar js y css para cuando el proyecto pase a producción y se use gulp para minificar y concatenar todas las dependencias del proyecto **8:11pm | 2018-02-20**

#### 2018-03-26

* Agregas las tipografías envíadas por el cliente para los iconos del minicart y el searchbar **20:06pm | 2018-02-26**
* Ajustes de css para el menú de navegación **20:06pm | 2018-02-26**
* Fix de función que clonaba el control y filtros de categoria y departamento para que siempre estuviera igual al final de los productos y al hacer click en el clon, gatillara las funciones del original **20:06pm | 2018-02-26**
* Ajustes de css en general **20:06pm | 2018-02-26**
* Se arregló la función para la selección de sku en vitrina, quickview y ficha de producto **20:06pm | 2018-02-26**


#### 2018-02-26 hasta 2018-03-01

* Evaluación de cambio para el navegador lateral en categoría y departamento. **15:51pm | 2018-02-26 _ 2018-03-01**
* Evaluación de minificación y concatenación usando la herramienta de gulpJS para mejorar procesos. **15:51pm | 2018-02-26 _ 2018-03-01**
* Ajuste de css para las vistas de producto en categoría y departamento. **15:51pm | 2018-02-26 _ 2018-03-01**
* Reajuste completo del checkout a nivel css siendo así lo más parecido posible con [es.tumi](https://es.tumi.com/) y ajustandolo a versiones móviles. **15:51pm | 2018-02-26 _ 2018-03-01**
* Implementación de las nuevas tipografías para los iconos de busqueda y carrito. **15:51pm | 2018-02-26 _ 2018-03-01**
* Vectorización del logo de tumi para usar la "T" como icono en el checkout. **15:51pm | 2018-02-26 _ 2018-03-01**
* Traducciones de palabras claves en la hoja de account. **15:51pm | 2018-02-26 _ 2018-03-01**
* Evaluación de script en versión mobile para hacer de la imagen principal un carrusel, ya que al cambiar de sku, la función no se ejecuta correctamente otra vez. **15:51pm | 2018-02-26 _ 2018-03-01**
* Creación de script en depto y categ para evitar que el usuario se pose sobre la vitrina inmediatamente al cargar la vista de productos y disparar el error 'add' por doble ejecución del slick carousel, asimismo, al cambiar la página con el paginador de categ/depto ejecutar las funciones que influyen directamente en los productos. **15:51pm | 2018-02-26 _ 2018-03-01**
* Agregada una funcionalidad que inserta información en el login. **15:51pm | 2018-02-26 _ 2018-03-01**

#### 2018-03-03

* Desarrollo de script para configuración de barra lateral de navegación para categoría y departamento, además se desarolló la funcionalidad para que al hacer click, se filtraran los productos, más el estilado de los colores. **3:39am | 2018-03-03**

#### 2018-03-06

* Estilado de footer para asemejar lo máximo el diseño de tumi.com **12:11pm | 2018-03-06**
* Desarrollo de funcionalidad para inhabilitar el minicart cuando éste está en "0" y cuando se eliminen productos del minicart y queda en "0" de igual manera inhabilitarlo **12:11pm | 2018-03-06**
* Añadido el botón "seguir comprando" en el minicart offcanvas desktop **12:11pm | 2018-03-06**
* Conformación de features por ficha de producto, estilado con css **12:11pm | 2018-03-06**
* Script para sustituir los pipes "|" en las características de producto por "*" y discriminar cuándo el producto tiene caracterísitcas exteriores e interiores  **5:30pm | 2018-03-06**

#### 2018-03-07

* Agregando el header en el checkout, creación de script para identificar los eventos del checkout **4:30pm | 2018-03-07**
* Ajuste de estilos en la ficha de producto **4:30pm | 2018-03-07**

#### 2018-03-08

* Configuración de master data **11:55am | 2018-03-08**
* Puliendo detalles de features y añadiendo la función que asigna mediante API la colección de los productos **12:45am | 2018-03-08**
* Discriminando con javascript que los features sólo se vean en producto con contenido **1:00pm | 2018-03-08**
* Configurando script para newsletter **1:00pm | 2018-03-08**

#### 2018-03-13

* Ajuste mobile de header en checkout **7:00pm | 2018-03-13**
* Ocultar los botones de vista rápida en los resultados de búsqueda **7:00pm | 2018-03-13**
* Desarrollo de mejora para el script que convierte las imágenes de la vitrina en carruseles, ya que ésta se desconfiguraba según la función recorría el API de producto a través de AJAX **7:00pm | 2018-03-13**
* Desarrollo de script para la correcta visualización de los botones de comprar según disponibilidad de los skus **7:00pm | 2018-03-13**
* Cambio de gráficas por las de tumi.com **7:00pm | 2018-03-13**
* Añadido slider nuevo de temporada **7:00pm | 2018-03-13**
* Añadido slider nuevo de temporada **7:00pm | 2018-03-13**
* Arreglo de tipografia en checkout **6:30pm | 2018-03-13**
* Arreglo de hover en botones de banner principales de home y departamentos **7:00pm | 2018-03-13**
* Cambiar texto boton departamento "shop now" **7:00pm | 2018-03-13**
* Cambiar el boton de tumi tracer para redirección **7:00pm | 2018-03-13**
* Cambiar banner de españa para bolsas de viaje hacia mexico equipaje **7:00pm | 2018-03-13**
* Agregar el mapa en el footer **7:00pm | 2018-03-13**
* Agregar linea gris sobre productos del home **7:00pm | 2018-03-13**
* Alinear imagenes de banners según el home de tumi.cm **7:00pm | 2018-03-13**
* Añadir las url a las imagenes en la vitrina **7:00pm | 2018-03-13**
* Script para ver más de los productos con muchos skus. **7:00pm | 2018-03-13**
* Agregar la colección en la versión mobile. **7:00pm | 2018-03-13**
* Top bar cambiar color y texto (Lookbook Primavera/Verano 2018) **7:00pm | 2018-03-13**
* Activar el boton de compra en ficha de producto para version mobile **7:00pm | 2018-03-13**
* Activar el botón de compra en la versión mobile **7:00pm | 2018-03-13**
* Cambiar los banners en el home para la versión mobile **7:00pm | 2018-03-13**

#### 2018-03-13

* Ajuste de "&" en mapa del sitio. **10:28pm | 2018-03-13**
* Ubicación de css de mapa del sitio en la hoja de css. **10:28pm | 2018-03-13**


### Changed

* Mejoras en los estilos de las páginas estáticas **10:14am | 2018-02-13**
* Se separó por índice las páginas estáticas de branding en el css principal **10:14am | 2018-02-13**
* Se cambió el menú del footer dejando sólo "La historia TUMI" y "responsabilidad empreasarial" mientras que se termina "La diferencia TUMI". **18:38pm | 2018-02-13**
* Se hicieron ajustes al .js de "nuestras tiendas" para cumplir con ciertas funcionalidades y que se pareciera más al de España. **18:38pm | 2018-02-13**
* Ajuste de las imágenes pertenecientes al slider principal en tamaños full hd para que tuviese un width del 100%. **10:24am | 2018-02-14**
* Ajuste de css para la vitrina a 6 columnas en las páginas de busqueda vacía **10:31am | 2018-02-14**
* La función de megamenú se ajustó para que el valor encontrado no compare exactamente el valor del menu, sino más bien éste coincida **11:08am | 2018-02-14**
* Se desactivó la función que convertía en un pasador de imagenes las miniaturas del producto en la ficha de producto **12:38pm | 2018-02-14**
* Ajustes de css para la ficha de producto según el diseño de tumi.com **17:57pm | 2018-02-16**
* Ajuste de css para el login **7:04pm | 2018-02-20**
* Desactivación del carrusel de imágenes en el quickview, éste causaba problemas en los productos con más de un sku **6:04pm | 2018-02-28**
* Cambio de html por controlador global para edición de copyright y estilado **12:11pm | 2018-03-06**
* Cambio de copyright en el checkout y estilado **12:12pm | 2018-03-06**
* En los departamentos se cambió el estilo por el que está originalmente en tumi.com y se añadió además el título "compra por categoría" **12:12pm | 2018-03-06**
* Ajuste de scripts para carruseles en ficha de producto ya que se estaban ejecutando los dos carruseles con un sólo script y fallaba al tener diferentes cantidades de productos **3:30pm | 2018-03-06**
* Cambio de imágenes en megamenu **8:40am | 2018-03-06**
* Cambio de imágenes y ajustes en la sección de "colecciones" **8:40am | 2018-03-07**

