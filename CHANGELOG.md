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
* Evaluación de minificación y concatenación usando la herramienta de gulpJS para mejorar procesos,
* Ajuste de css para las vistas de producto en categoría y departamento,
* Reajuste completo del checkout a nivel css siendo así lo más parecido posible con [es.tumi](https://es.tumi.com/) y ajustandolo a versiones móviles,
* Implementación de las nuevas tipografías para los iconos de busqueda y carrito,
* Vectorización del logo de tumi para usar la "T" como icono en el checkout
* Traducciones de palabras claves en la hoja de account,
* Evaluación de script en versión mobile para hacer de la imagen principal un carrusel, ya que al cambiar de sku, la función no se ejecuta correctamente otra vez,
* Creación de script en depto y categ para evitar que el usuario se pose sobre la vitrina inmediatamente al cargar la vista de productos y disparar el error 'add' por doble ejecución del slick carousel, asimismo, al cambiar la página con el paginador de categ/depto ejecutar las funciones que influyen directamente en los productos,
* Agregada una funcionalidad que inserta información en el login
**15:51pm | 2018-02-26 _ 2018-03-01**

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


### Pending

* Las gráficas se cambiaran entre hoy y mañana en la mañana.
* Los features estarán listo en el mismo tiempo que el punto anterior.
* Se están terminando detalles finos de diseño.
* La barra de navegación lateral para las categorías y departamentos quedará con el funcionamiento nativo de vtex el día de hoy mientras se desarrolla el funcionamiento deseado.