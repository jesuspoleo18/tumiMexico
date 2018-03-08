// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

/*=============================================
=            checkout js            =
=============================================*/

$(function () {
    init();
});

function init() {
    carrito.init();
}

var carrito = {

    init: function () {

        //setInterval(carrito.elementosFormato, 2500);
        carrito.campoSexo();
        carrito.profileMasterdata();
        // carrito.cupon();
        carrito.eventHasChange();
    },
    formatoDecimales: function (seletor) {

        $(seletor).each(function () {

            var novoConteudoPreco = $(this).text();

            if (novoConteudoPreco.indexOf(',') > -1) {

                var padrao = /([$\s\d,]*)([.\d]+)/gm;

                novoConteudoPreco = novoConteudoPreco.replace(padrao, '$1').replace(',', '.');

                $(this).html(novoConteudoPreco);

            }

        });

    },
    elementosFormato: function () {

        var $ajaxStopElems = '.total-selling-price, .monetary, .new-product-price, .sla-value, .sight, .description .price.pull-right, .shipping-option-item-value, .delivery-windows .radio span, .old-product-price.muted';

        carrito.formatoDecimales($ajaxStopElems);
        porcentaje();

        $(document).ajaxStop(function () {
            carrito.formatoDecimales($ajaxStopElems);
        });

    },
    campoSexo: function () {

        var $sexForm = "<div class='sexForm__container'><div class='newsletter__femenino'> <input id='tp_femenino' type='checkbox' name='tp_femenino' value='femenino'> <label for='femenino'>Femenino</label> </div> <div class='newsletter__masculino'> <input id='tp_masculino' type='checkbox' name='tp_masculino' value='masculino'> <label for='masculino'>Masculino</label> </div></div>",
            $target = $(".client-last-name"),
            $targetBtn = $(".submit.btn-submit-wrapper"),
            $submitBtn = $("<button type='submit' id='tp_checkout' class='tp_checkout' name='submit' value='Enviar'></button>");

        $targetBtn.prepend($submitBtn);
        $target.after($sexForm);

    },
    profileMasterdata: function () {

        var $fem = $('#tp_femenino'),
            $masc = $('#tp_masculino'),
            $sexContainer = $('.sexForm__container'),
            $errorGender = '<p id="errorGender"></p>';

        $sexContainer.after($errorGender);

        $fem.on("change", function () {
            $masc.attr('checked', false);
        });

        $masc.on("change", function () {
            $fem.attr('checked', false);
        });

        $('#tp_checkout').on("click", function (e) {

            var $femenino = $('#tp_femenino:checked'),
                $masculino = $('#tp_masculino:checked'),
                $errorGenderMessage = '<span>Este campo es obligatorio</span>',
                $submitBtn = $(".tp_checkout");

            if ($femenino.length || $masculino.length) {
                carrito.genero();
                $("#errorGender").hide();
                $submitBtn.hide();
            } else {
                $("#errorGender").html($errorGenderMessage);
            }

            e.preventDefault();

        });

    },
    genero: function () {

        var datos = {};

        datos.tp_email = $("#client-email").val();
        datos.tp_nombre = $("#client-first-name").val();
        datos.tp_apellido = $("#client-last-name").val();
        datos.tp_documento = $("#client-document").val();
        datos.tp_telefono = $("#client-phone").val();
        datos.tp_femenino = $('#tp_femenino:checked').val();
        datos.tp_masculino = $('#tp_masculino:checked').val();

        $.ajax({

            accept: 'application/vnd.vtex.ds.v10+json',
            contentType: 'application/json; charset=utf-8',
            crossDomain: true,
            data: JSON.stringify(datos),
            type: 'POST',
            url: '//api.vtexcrm.com.br/tumimx/dataentities/TP/documents',

            success: function (data) {

                var $submitBtn = $(".tp_checkout"),
                    $targetBtn = $("#go-to-payment");

                $submitBtn.hide();
                $targetBtn.click();

                console.log("se enviaron los datos satisfactoriamente");

            },
            error: function (data) {
                console.log("Hubo un error en enviar la información a la entidad de datos");
            }

        });

    },
    cupon: function () {

        var $trigger = $(".link-coupon-add");

        $trigger.click();
    },
    eventHasChange: function () {

        var a = window.location.href,
            $effectOut = function (el) {
                return el.fadeOut(500);
            },
            $effectIn = function (el) {
                return el.fadeIn(800);
            };

        // listen for changes
        setInterval(function () {
            if (a != window.location.href) {
                // page has changed, set new page as 'current'
                a = window.location.href;
                // do your thing...
                if (a.indexOf("payment") > -1 || a.indexOf("profile") || a.indexOf("shipping") > -1) {
                    $.when($effectOut($(".header__content,.navigation__content"))).done(function () {
                        $effectIn($(".checkout__header-container"));
                    });
                    // $(".header__content,.navigation__content").fadeOut();
                    // $(".checkout__header-container").fadeIn();
                }
                if (a.indexOf("cart") > -1) {
                    $.when($effectOut($(".checkout__header-container"))).done(function () {
                        $effectIn($(".header__content,.navigation__content"));
                    });
                }
            }
        }, 500);
    }
};

/*=====  End of checkout js  ======*/