/*----------------------------inicio--------------------------------

[js - principal ]

Projecto:  Tumi México - 2017
Version: 0.1
Ultimo cambio:  16/11/2017
Asignado a:  implementacion.
Primary use:  ecommerce. 

----------------------

[Tabla de contenido ]

--------- controles -------------

b0.Init
b1.Configuraciones generales
b2.Home
b3.Producto
b4.Categ/depto
b5.Busca, resultado de busca, 404 y error 500
b6.Account

-------------------------fin---------------------------------*/
/* 

[a0.Globales]

============================= */

const $home = $(".home");
const $categDeptoBuscaResultadoBusca = $(".categoria, .departamento, .busca, .resultado-busca");
const $producto = $(".producto");

/* 

[b0.Init]

============================= */

$(function () {
    $(document).foundation();
    confiGenerales.init();
    home.init();
});

/* 

[b1.Configuraciones generales]

============================= */

const confiGenerales = {

    init: function () {

        confiGenerales.mainLazyLoad();
        confiGenerales.triggerActions();
        // confiGenerales.FormatoDecimales();
        confiGenerales.elementosFormato();
        confiGenerales.accordion('.toggle-trigger', '.toggle-container');
        $(window).on("resize", function () {
            confiGenerales.accordion('.toggle-trigger', '.toggle-container');
        });
        confiGenerales.backTop();
        // confiGenerales.stickyNav();
        confiGenerales.megaMenu('.navigation__menu a', 'header,.megamenu-buscar.navigation__searchTrigger,.home__content');
        // confiGenerales.compraAsyncVitrina();
        confiGenerales.checkEmptyCart();
        confiGenerales.quickViewAsyncBuy();
        confiGenerales.masterData();
        confiGenerales.replaceHref();
        $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
            // console.log("actualizó");
            confiGenerales.checkEmptyCart();
        });
        console.log("confiGenerales.init()  ˙ω˙");

    },

    changePlaceholders:function(){
        let $a = $(".btn-buscar"),
            $b = $("<div class='search__icon'></div>"),
            $c = $(".search__icon");
        $a.attr({placeholder: " ", value:" " });
        $c.length ? console.log("˙ω˙ icono agregado") : $a.before($b);
    },

    triggerActions:function(){

        let $triggerCart = $(".header-cart__content,.navigation-cart__container"),
            $triggerSearch = $(".navigation__searchTrigger"),
            $closeSearch = $(".navigation__closeBar"),
            $a = $('#offCanvasRight'),
            $b = $(".navigation__searchBar");

        $triggerCart.on("click", function(e) {
            e.preventDefault();
            $a.foundation('open', event, "[data-toggle=offCanvasLeft]"); 
        });

        $closeSearch.on("click", function (e) {
            e.preventDefault();
            $b.removeClass("active");
        });

        $triggerSearch.on("click", function (e) {
            e.preventDefault();
            $b.toggleClass("active");
            confiGenerales.changePlaceholders();
        });
    },

    mainLazyLoad: function () {

        var files = ["https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/8.2.0/lazyload.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        }))
            .then(function () {

                let $productoContainer = $(".producto-prateleira"),
                    $producto = $(".producto");

                $productoContainer.each(function () {

                    let $thisImg = $(this).find(".producto-prateleira__imagen--url .imagen div"),
                        $thisDiv = $(this).find(".producto-prateleira__imagen--url .imagen"),
                        $thisParent = $(this).find(".producto-prateleira__imagen--url .imagen [data-was-processed='true']");

                    if ($thisImg.length) {

                        if ($thisParent.length) {
                            $thisParent.parent().addClass("load");
                        }
                        // console.log("Texting");
                    } else {
                        $thisDiv.append("<div></div>");
                        if ($thisParent.length) {
                            $thisParent.parent().addClass("load");
                        }
                    }

                });

                // if($home.length || $categDepto.length || $producto.length ){

                let home = new LazyLoad({

                    elements_selector: "img",
                    threshold: 50,

                    callback_load: function (element) {
                        // console.log("lazy loaded");
                    },
                    callback_set: function (element) {
                        // console.log("lazy set");
                    },
                    callback_processed: function (elementsLeft) {
                        // console.log("lazy proceced");
                    }

                });

                // }

            }, function err(jqxhr, textStatus, errorThrown) {
                console.log(textStatus);
            });

    },

    FormatoDecimales: function (seletor) {

        $(seletor).each(function () {

            var novoConteudoPreco = $(this).text();

            if (novoConteudoPreco.indexOf(',') > -1) {

                // var padrao = /(\$[\s0-9.]*)([,0-9]+)/gm;
                var padrao = /([$\s\d,]*)([.\d]+)/gm;

                novoConteudoPreco = novoConteudoPreco.replace(padrao, '$1').replace(',', '.');

                $(this).html(novoConteudoPreco);

            }

        });

    },

    elementosFormato: function () {

        let $ajaxStopElems = '.skuListPrice,.oldPrice, .skuBestInstallmentValue, em.total-cart-em, td.monetary, span.best-price.new-product-price, td.quantity-price.hidden-phone.hidden-tablet,span.payment-value-monetary,span.payment-installments, .producto-prateleira__info--bestPrice div, .producto-prateleira__info--oldPrice div',
            $porcentaje = $('.porcentaje');

        if ($porcentaje.lenght) {

            $porcentaje.each(function () {

                let valor = $(this).text();
                if (valor == 0) { $(this).remove(); } else { $(this).text(valor.split(',')[0] + '%'); }

            });

        } else { console.log("porcentaje desactivado"); }

        // confiGenerales.FormatoDecimales($ajaxStopElems);
        porcentaje();

        $(document).ajaxStop(function () {
            // confiGenerales.FormatoDecimales($ajaxStopElems);
            porcentaje();
        });

        function porcentaje() {

            $(".porcentaje-content").each(function () {

                var valor = $(this).text();

                if (valor == 0) {
                    $(this).remove();
                }
                else {
                    $(this).text(valor.replace(',0', ''));
                }

            });
        }

    },

    accordion: function (trigger, content) {

        let $responsive = $(window).width();

        if ($responsive < 768) {

            console.log("accordion");

            $(content).hide();

            $(trigger).on("click", function () {
                $(this).toggleClass("active").nextAll().slideToggle("slow");
                return false;
            });
        } else {
            $(content).show();
        }

    },

    backTop: function () {

        let offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $('.back-to-top');

        //hide or show the "back to top" link
        $(window).scroll(function () {

            ($(this).scrollTop() > offset) ? $back_to_top.addClass('back-to-top-is-visible') : $back_to_top.removeClass('back-to-top-is-visible back-to-top-fade-out');

            if ($(this).scrollTop() > offset_opacity) {
                $back_to_top.addClass('back-to-top-fade-out');
            }
        });

        //smooth scroll to top
        $back_to_top.on('click', function (event) {

            event.preventDefault();

            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });

    },

    stickyNav: function (el) {

        $("#mobile-nav").removeClass('sticky');

        $(window).scroll(function () {

            if ($(this).scrollTop() > 1) {

                $(el).addClass('sticky');
                $(el).removeClass('fixed');
                $("#mobile-nav").addClass('sticky');

            } else {

                $(el).removeClass("sticky");
                $("#mobile-nav").removeClass('fixed sticky');

            }

        });

    },

    megaMenu: function (el, exit) {

        let $exit = $("header,.megamenu-buscar.navigation__searchTrigger,.home__content"),
            $responsive = $(window).width(),
            $viajes = $("#megamenu-viajes"),
            $mochilas = $("#megamenu-mochilas"),
            $equipaje = $("#megamenu-equipaje"),
            $accesorios = $("#megamenu-accesorios"),
            $colecciones = $("#megamenu-colecciones"),
            $ideasRegalos = $("#megamenu-ideasRegalos"),
            $sale = $("#megamenu-sale");

        if ($responsive > 768) {

            $(el).each(function () {

                // entra mouse
                $(this).on("mouseenter", function () {

                    let $a = $(this).attr("class"),
                        $this = $(this);

                    confiGenerales.mainLazyLoad();

                    if ($a == 'megamenu-viajes') {

                        menuItems($this, $exit);
                        outMegamenu($viajes);

                    } else if ($a == 'megamenu-mochilas') {

                        menuItems($this, $exit);
                        outMegamenu($mochilas);

                    } else if ($a == 'megamenu-equipaje') {

                        menuItems($this, $exit);
                        outMegamenu($equipaje);

                    } else if ($a == 'megamenu-accesorios') {

                        menuItems($this, $exit);
                        outMegamenu($accesorios);

                    } else if ($a == 'megamenu-colecciones') {

                        menuItems($this, $exit);
                        outMegamenu($colecciones);

                    } else if ($a == 'megamenu-ideasRegalos') {

                        menuItems($this, $exit);
                        outMegamenu($ideasRegalos);

                    } else if ($a == 'megamenu-sale navigation__sale') {

                        menuItems($this, $exit);
                        outMegamenu($sale);

                    } else if ($a == 'megamenu-colecciones') {

                        menuItems($this, $exit);
                        outMegamenu($accesorios);

                    }

                });

            });

        }

        function menuItems(ele,exit){
            ele.addClass("active");
            ele.siblings().removeClass("active");

            $(exit).on("hover", function () {

                ele.removeClass("active");
                $(exit).removeClass("active");

            });
        }

        function outMegamenu(ele) {

            ele.addClass('display', 500);

            // $(exit).addClass("display", 500);

            $(exit).on("hover", function () {

                ele.removeClass("display", 500);

                $(exit).removeClass("display", 500);

            });

            ele.siblings().removeClass("display");

        }

    },

    compraAsyncVitrina: function () {

        let $contentAsync = $(".producto-prateleira__info--precio-container"),
            $btnAsync = $('.btn-add-buy-button-asynchronous');

        $contentAsync.each(function () {

            let $thisBtn = $(this).find($btnAsync);

            $thisBtn.unbind('click');

            $thisBtn.bind('click', function (e) {

                let url = $(this).attr('href').split("?")[1],
                    param = url.split("&"),
                    item = {
                        id: param[0].split("=")[1],
                        quantity: param[1].split("=")[1],
                        seller: param[2].split("=")[1]
                    };

                e.preventDefault();

                vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {

                    $('#agregadoExito').foundation('reveal', 'open');
                    console.log(orderForm);

                });

            });

        });

    },

    checkEmptyCart: function () {

        let $emptyBag = $(".middle-container__content-popCart .emptyBag"),
            $NoEmptyBag = $(".middle-container__content-popCart .emptyBag.active"),
            $cartNumber = $(".middle-container__content-cart"),
            $cartFooter = $(".middle-container__content-popCart .cartFooter"),
            $monto = $(".middle-container__content-popCart .vtexsc-text").text().replace('R$', ''),
            $montoValor = parseFloat($monto);

        // console.log($montoValor);

        if ($montoValor == 0) {

            // console.log("miniCart vacío");
            confiGenerales.mainLazyLoad();

            $emptyBag.addClass("active");
            $cartNumber.removeClass("active");
            $cartFooter.removeClass("clearfix");

        }
        if ($montoValor > 0) {

            confiGenerales.mainLazyLoad();

            // console.log("miniCart tiene productos");

            $NoEmptyBag.removeClass("active");
            $cartNumber.addClass("active");
            $cartFooter.removeClass("clearfix");
        }

    },

    quickViewAsyncBuy: function () {

        let $iframeContentTop = $('#TB_iframeContent', top.document);

        $iframeContentTop.on("load", function () {

            let $iframeBuySuccess = $(".TB_compraExitosa"),
                $thisBtn = $(".buy-button.buy-button-ref"),
                $descripcion = $(".quickview-container__informacion--basica-content .descripcion-larga"),
                $ean = $(".quickview-container__informacion--basica-content .ean"),
                producto = {
                    id: "",
                    descripcion: "",
                    ean: "",
                    caracteristica: "",
                    stock: "",
                    marca: ""
                },
                $productoName = $(".notifyme-client-name"),
                $productoEmail = $(".notifyme-client-email");

            // $productoName.attr("placeholder", "NOMBRE");
            // $productoEmail.attr("placeholder", "EMAIL");

            // getCurrentProductWithVariations

            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

                producto.stock = product.available;
                producto.id = product.productId;
                console.log(product);

                $.ajax({
                    url: "https://lojasamsonite.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + producto.id + "",
                    dataType: 'json',
                    type: 'GET',
                    crossDomain: true,
                    success: function (data) {

                        // producto.descripcion = data[0]['Descripción Larga'];
                        // producto.caracteristica = data[0].Características[0];
                        producto.descripcion = data[0].description;
                        producto.ean = data[0].items[0].ean;
                        producto.marca = data[0].brand;

                        var $template = '<div class="basica-marca">' + producto.marca + '</div>';

                        $($template).insertAfter(".basica-nombre");
                        $descripcion.append(producto.descripcion);
                        $ean.append(producto.ean);
                        marcaProductoQuickview();
                        seeMore();
                        dotInfo();
                        // $caracteristica.append(producto.caracteristica);

                        console.log(data);
                    }
                });

                $thisBtn.unbind('click');

                $thisBtn.bind('click', function (e) {

                    var url = $(this).attr('href').split("?")[1],
                        param = url.split("&"),
                        item = {
                            id: param[0].split("=")[1],
                            quantity: param[1].split("=")[1],
                            seller: param[2].split("=")[1]
                        };

                    e.preventDefault();

                    vtexjs.checkout.getOrderForm().done(function (e) {

                        vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {
                            // window.parent.confiGenerales.refreshMiniCart();
                            $iframeBuySuccess.show();
                        });

                    });

                });

                miniaturaSlickQuickview();

                function marcaProductoQuickview() {

                    var $location = $(".quickview-container__informacion--basica-content");

                    if (producto.marca == 'American Tourister') {

                        var $templateaT = '<div class="logo-marca"><img src=/arquivos/logo-AT.png></div>';

                        $location.prepend($templateaT);

                    } else if (producto.marca == 'Samsonite Black Label') {

                        var $templatesmxBlack = '<div class="logo-marca"><img src=/arquivos/logo-smxNegro-3.png></div>';

                        $location.prepend($templatesmxBlack);

                    } else if (producto.marca == 'Samsonite') {

                        var $templatesmx = '<div class="logo-marca"><img src=/arquivos/logo-smxAzul-3.png></div>';

                        $location.prepend($templatesmx);

                    }

                }

                function dotInfo() {

                    var $texto = $(".quickview-container__informacion .descripcion-larga").text(),
                        $container = $(".quickview-container__informacion .descripcion-larga"),
                        $result = $texto.replace(/\*/g, '<p class="space"></p><span class="dot">• </span>');

                    $container.html($result);
                }

                function miniaturaSlickQuickview() {

                    var $el = $(".quickview-container__imagen--content .thumbs li"),
                        $init = $(".quickview-container__imagen--content .thumbs");

                    if ($el.length > 3) {

                        $init.slick({

                            arrows: true,
                            prevArrow: "<i class='fa fa-angle-left' aria-hidden='true'></i>",
                            nextArrow: "<i class='fa fa-angle-right' aria-hidden='true'></i>",
                            autoplay: false,
                            button: false,
                            dots: false,
                            fade: false,
                            infinite: true,
                            slidesToScroll: 1,
                            slidesToShow: 3,
                            speed: 800,
                            useTransform: true

                        });

                    }

                }

                function seeMore() {

                    var files = ["/arquivos/readmore.min.js"];

                    $.when.apply($, $.map(files, function (file) {
                        return $.getScript(files);
                    }))
                        .then(function () {

                            var $el = $(".quickview-container__informacion--basica-content .descripcion-larga");

                            $($el).readmore({
                                speed: 100,
                                collapsedHeight: 50,
                                moreLink: '<a class="seeMore" href="#">Ler mais</a>',
                                lessLink: '<a class="seeLess" href="#">Leia menos</a>'
                            });

                        }, function err(jqxhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        });

                }

            }); // /.fin getCurrentProductWithVariations.

        });

    },

    refreshMiniCart: function () {

        vtexjs.checkout.getOrderForm();
        $("#TB_overlay", document.body).remove();
        $("#TB_window", document.body).remove();

    },

    masterData: function () {

        $('#contacto-submit').on("click", function (e) {

            e.preventDefault();
            contacto();

        });

        $('#newsletter_submit').on("click", function (e) {

            let $femenino = $('#sn_femenino:checked'),
                $masculino = $('#sn_masculino:checked'),
                $errorGenderMessage = '<span>Por favor, complete todos los campos</span>';

            if ($femenino.length || $masculino.length) {
                newsletter();
                $("#errorGender").hide();
            } else {
                $("#errorGender").html($errorGenderMessage).show();
            }

            e.preventDefault();

        });

        function newsletter() {

            var datos = {};

            datos.sn_name = $('#sn_name').val();
            datos.sn_email = $('#sn_email').val();
            datos.sn_femenino = $('#sn_femenino:checked').val();
            datos.sn_masculino = $('#sn_masculino:checked').val();

            $.ajax({

                accept: 'application/vnd.vtex.ds.v10+json',
                contentType: 'application/json; charset=utf-8',
                crossDomain: true,
                data: JSON.stringify(datos),
                type: 'POST',
                url: '//api.vtexcrm.com.br/lojasamsonite/dataentities/SN/documents',

                success: function (data) {

                    $('#NewsAprob').foundation('reveal', 'open');
                    clearData();

                },
                error: function (data) {

                    $('#NewsError').foundation('reveal', 'open');
                }
            });

        }

        function clearData() {

            var $accepted = $(".estatico"),
                $content = $(".footer-newsletter__content"),
                $input = $("input:checkbox"),
                $nombre = $("#sn_name"),
                $email = $("#sn_email");

            $content.find($input).removeAttr('checked');
            $nombre.val("");
            $email.val("");

            if ($accepted.length) {
                $(".estatico-content__contenido input[type='text'],.estatico-content__contenido input[type='email']").val('');
            }

        }

        function contacto() {

            var datos = {};

            datos.sc_nombre = $('#sc_nombre').val();
            datos.sc_apellido = $('#sc_apellido').val();
            datos.sc_email = $("#sc_email").val();
            datos.sc_telefono = $("#sc_telefono").val();
            datos.sc_ciudad = $("#sc_ciudad").val();
            datos.sc_asunto = $("#sc_asunto").val();
            datos.sc_mensaje = $("#sc_mensaje").val();

            $.ajax({

                accept: 'application/vnd.vtex.ds.v10+json',
                contentType: 'application/json; charset=utf-8',
                crossDomain: true,
                data: JSON.stringify(datos),
                type: 'POST',
                url: '//api.vtexcrm.com.br/lojasamsonite/dataentities/SC/documents',

                success: function (data) {

                    $('#NewsAprob').foundation('reveal', 'open');
                    clearData();

                },
                error: function (data) {

                    $('#NewsError').foundation('reveal', 'open');
                }
            });

        }

    },

    replaceHref: function () {

        let $accept = $(".categoria, .departamento, .home, .producto, .resultado-busca, .brand");

        if ($accept.length) {

            let $a = $('.thickbox');

            $a.each(function (key, val) {
                $(val).attr('href', $(val).attr('href').replace("http://", "https://"));
            });
        }

    },

};

/* 

[b2.Home]

============================= */

const home = {

    init: function () {

        if ($home.length) {
            home.carousel('.home-slide');
        }
    },

    carousel: function (uno) {

        $(".helperComplement").remove();

        $(uno).slick({

            arrows: false,
            autoplay: false,
            autoplaySpeed: 2500,
            button: false,
            dots: true,
            fade: false,
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 800,
            useTransform: true,
            responsive: [{
                breakpoint: 650,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: true
                }
            }]

        });

    }
};

/* 

[b3.Producto]

============================= */

/* 

[b4.Categ/depto]

============================= */

/* 

[b5.Busca, resultado de busca, 404 y error 500]

============================= */

var busca = {
    init: function () { },

    fraseBusqueda: function () {

        var $buscavazia = $(".estatico.buscavazia"),
            $resultadoBusca = $(".resultado-busca"),
            $productoEncontrado = $(".vitrine.resultItemsWrapper");

        if ($buscavazia.length) {

            var href = window.location.href,
                url = href.split('=')[1],
                $el = $(".frase__content");

            $el.append(url);

        } else if ($resultadoBusca.length) {

            var href = window.location.href,
                url = href.split('/')[3],
                $body = $("body.resultado-busca"),
                $parent = $(".resultado-content"),
                $el = $(".resultado-content .resultado"),
                $template = '<div class="cuatro__container"> <div class="cuatro__container--img"> <img src="/arquivos/sbr-sin-resultado.png" /> </div> <div class="cuatro__container--texto"> <div class="texto__content">Sua busca para:<strong class="resultado">' + url + '</strong>não encontrou nenhum resultado.</div> </div> </div>';

            if ($productoEncontrado.length) {

                $el.append(url);

            } else {

                $body.addClass('no-encontro');
                $parent.html($template);
            }

        }

    },

    resultadoBusqueda: function () {

        var $accept = $("body.resultado-busca, body.brand");

        if ($accept.length) {

            var url = window.location.pathname,
                coleccion = window.location.href,
                $coleccionParent = $(".resultado-busca-result__content"),
                urlText = url.split("/")[1],
                $resultText = $(".resultado-busca-result .result"),
                $filter = $(".Hide.HideMarca"),
                $body = $("body.resultado-busca,body.brand"),
                $hideSideBar = $(".content__aside");

            if ($filter.length == 0) {

                $hideSideBar.remove();
                $body.addClass("no-encontro-filtros");

            }
            if (coleccion.includes('busca?fq')) {
                $coleccionParent.html("Os resultados da <strong>coleção</strong> são:");
            }

            $resultText.html(decodeURIComponent(urlText));

        }

    },
};

/* 

[b6.Account]

============================= */