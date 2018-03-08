# Changelog

Todos los cambios hechos en el proyecto serán documentados en este archivo de cambios.

## [Unreleased](https://github.com/jesuspoleo18/tumiMexico/commits/master)

## [0.0.0]() - 2018-02-xx

### Added
* Adición del contenido parcial de responsabilidad empresarial **10:14am | 2018-02-13**
* Se añadio el .js para nuestras tiendas así como también se creó el template y el placeholders. **18:38pm | 2018-02-13**
* Estilado de "nuestras tiendas" versión desktop. **18:38pm | 2018-02-13**
* Se añadió una función en el .js de "nuestras tiendas" para ocultar y mostrar el mapa en versiones mobiles así como también se añadío el css para versión mobiles **12:37pm | 2018-02-14**
* Desarrollo de función que permite consultar los sku de cada variante por producto en hover para la vista de catagoria/depto **18:54pm | 2018-02-14**
* Añadido script que consulta los eventos hash on change **18:54pm | 2018-02-14**
* Desarrollo del script que consulta las apis de vtex para traerse los datos de los SKUS en pintarlos en la vitrina con las urls de los skus **17:56pm | 2018-02-16**
* Desarrollo de script para modelado de imagenes en los botones checkbox de la vista de producto y ajuste de css **17:56pm | 2018-02-16**
* Estilado de accout, orders y checkout (andres guzman) **17:56pm | 2018-02-16**
* Se aplicó un truco aportado por los desarrolladores de tumiMX para cambiar el color del fondo de las imágenes **6:22pm | 2018-02-20**
* Traducciones para account **8:11pm | 2018-02-20**
* Se añadió las carpetas de Concatenar js y css para cuando el proyecto pase a producción y se use gulp para minificar y concatenar todas las dependencias del proyecto **8:11pm | 2018-02-20**
* Agregas las tipografías envíadas por el cliente para los iconos del minicart y el searchbar **20:06pm | 2018-02-26**
* Ajustes de css para el menú de navegación **20:06pm | 2018-02-26**
* Fix de función que clonaba el control y filtros de categoria y departamento para que siempre estuviera igual al final de los productos y al hacer click en el clon, gatillara las funciones del original **20:06pm | 2018-02-26**
* Ajustes de css en general **20:06pm | 2018-02-26**
* Se arregló la función para la selección de sku en vitrina, quickview y ficha de producto **20:06pm | 2018-02-26**
* Evaluación de cambio para el navegador lateral en categoría y departamento,
- Evaluación de minificación y concatenación usando la herramienta de gulpJS para mejorar procesos,
- Ajuste de css para las vistas de producto en categoría y departamento,
- Reajuste completo del checkout a nivel css siendo así lo más parecido posible con [es.tumi](https://es.tumi.com/) y ajustandolo a versiones móviles,
- Implementación de las nuevas tipografías para los iconos de busqueda y carrito,
- Vectorización del logo de tumi para usar la "T" como icono en el checkout
- Traducciones de palabras claves en la hoja de account,
- Evaluación de script en versión mobile para hacer de la imagen principal un carrusel, ya que al cambiar de sku, la función no se ejecuta correctamente otra vez,
- Creación de script en depto y categ para evitar que el usuario se pose sobre la vitrina inmediatamente al cargar la vista de productos y disparar el error 'add' por doble ejecución del slick carousel, asimismo, al cambiar la página con el paginador de categ/depto ejecutar las funciones que influyen directamente en los productos,
- Agregada una funcionalidad que inserta información en el login **15:51pm | 2018-02-26 _ 2018-03-01**
* Desarrollo de script para configuración de barra lateral de navegación para categoría y departamento, además se desarolló la funcionalidad para que al hacer click, se filtraran los productos, más el estilado de los colores. **3:39am | 2018-03-03**
* Estilado de footer para asemejar lo máximo el diseño de tumi.com **12:11pm | 2018-03-06**
* Desarrollo de funcionalidad para inhabilitar el minicart cuando éste está en "0" y cuando se eliminen productos del minicart y queda en "0" de igual manera inhabilitarlo **12:11pm | 2018-03-06**
* Añadido el botón "seguir comprando" en el minicart offcanvas desktop **12:11pm | 2018-03-06**
* Conformación de features por ficha de producto, estilado con css **12:11pm | 2018-03-06**
* Script para sustituir los pipes "|" en las características de producto por "*" y discriminar cuándo el producto tiene caracterísitcas exteriores e interiores  **5:30pm | 2018-03-06**
* Agregando el header en el checkout, creación de script para identificar los eventos del checkout **4:30pm | 2018-03-07**
* Ajuste de estilos en la ficha de producto **4:30pm | 2018-03-07**
* Configuración de master data **11:55am | 2018-03-08**
* Puliendo detalles de features y añadiendo la función que asigna mediante API la colección de los productos **12:45am | 2018-03-08**
* Discriminando con javascript que los features sólo se vean en producto con contenido **1:00pm | 2018-03-08**
* Configurando script para newsletter **1:00pm | 2018-03-08**


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

### Pending
