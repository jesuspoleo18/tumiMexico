/*----------------------------inicio--------------------------------

[js - principal ]

Projecto:  Tumi México - 2018
Version: 1.0.6
Ultimo cambio: 2018/04/24
Asignado a:  implementacion.
Primary use:  ecommerce. 

----------------------

[Tabla de contenido ]

a0.Globales
b0.Init
b1.Mantencion

-------------------------fin---------------------------------*/

/* 

[a0.Globales]

============================= */

var $body = $("body"),
    $home = $(".home"),
    $static = $(".static.help"),
    $login = $("body.login"),
    $categDeptoBuscaResultadoBusca = $("body.categoria, body.depto, body.busca, body.resultado-busca, body.brand"),
    $producto = $(".producto"),
    $responsive = $(window).width(),
    store = 'https://tumimx.vtexcommercestable.com.br/',
    tumiSearchApi = store + 'api/catalog_system/pub/products/search/',
    clog = console.log;

/* 

[b0.Init]

============================= */

$(function () {
    mantencion.init();
});

$(window).load(function () {});

/* 

[b1.Mantencion]

============================= */

var mantencion = {
    init: function(){
        mantencion.promoPopUp();
        console.log("mantencion.init()  ˙ω˙");
    },
    promoPopUp: function () {

        var files = ["/arquivos/coverPop.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        })).then(function () {

            // my functions

            var $testModule = $(".test-module");
            var $home = $(".home");
            var $coverOverlay = '<div class="coverOverlay"></div>';

            if ($home.length || $testModule.length) {
            // if ($testModule.length) {
                CoverPop.start({
                    coverId: 'CoverPop-cover',
                    cookieName: '_CoverPop',
                    closeOnEscape: true,
                    delay: 1000,
                    expires: 1,
                    onPopUpOpen: function () {
                        $home.addClass("coverPopDisplay");
                        $testModule.addClass("coverPopDisplay");
                        $('body').append($coverOverlay);
                        $('.coverOverlay').on("click", function () {
                            CoverPop.close();
                        });
                    },
                    onPopUpClose: function () {
                        $home.removeClass("coverPopDisplay");
                        $testModule.removeClass("coverPopDisplay");
                        $('.coverOverlay').fadeOut(500);
                    }

                });
                CoverPop.start();
            }

            // /.end my functions

        }, function err(jqxhr, textStatus, errorThrown) {
            console.log(textStatus);
        });
    }
};