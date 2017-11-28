/*----------------------------inicio--------------------------------

[js - principal ]

Projecto:  Tumi México - 2017
Version: 0.1
Ultimo cambio:  28/11/2017
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

var $home = $(".home"),
    $categDeptoBuscaResultadoBusca = $(".categoria, .departamento, .busca, .resultado-busca"),
    $producto = $(".producto");

/* 

[b0.Init]

============================= */

$(function () {
    $(document).foundation();
    confiGenerales.init();
    producto.init();
    home.init();
});

/* 

[b1.Configuraciones generales]

============================= */

var confiGenerales = {

    init: function init() {

        confiGenerales.mainLazyLoad();
        // confiGenerales.FormatoDecimales();
        confiGenerales.stickySearch();
        confiGenerales.infoTab();
        confiGenerales.triggerActions();
        confiGenerales.elementosFormato();
        confiGenerales.accordion('.footer__title', '.footer__elements');
        confiGenerales.backTop();
        // confiGenerales.stickyNav();
        confiGenerales.megaMenu('.navigation__menu a', 'header,.megamenu-buscar.navigation__searchTrigger, main, footer');
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

    stickySearch: function stickySearch() {
        var $el = $(".ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all");

        $(window).scroll(function () {

            if ($(this).scrollTop() > 1) {
                $($el).addClass('sticky');
                $($el).removeClass('fixed');
            } else {
                $($el).removeClass("sticky");
            }
        });
    },

    infoTab: function infoTab() {
        var $news = $("[data-click='news']"),
            $sellers = $("[data-click='sellers']"),
            $newsTab = $(".home__tabs-content.news"),
            $bestSellerTab = $(".home__tabs-content.bestSellers");

        $news.addClass("active");
        $newsTab.addClass("active");
        $news.on("click", function (e) {
            e.preventDefault();
            $(this).addClass("active");
            $sellers.removeClass("active");
            $newsTab.addClass("active");
            $bestSellerTab.removeClass("active");
        });
        $sellers.on("click", function (e) {
            e.preventDefault();
            $(this).addClass("active");
            $news.removeClass("active");
            $newsTab.removeClass("active");
            $bestSellerTab.addClass("active");
        });
    },

    changePlaceholders: function changePlaceholders() {
        var $a = $(".btn-buscar"),
            $b = $("<div class='search__icon'></div>"),
            $c = $(".search__icon");
        $a.attr({ placeholder: " ", value: " " });
        $c.length ? console.log("˙ω˙ icono agregado") : $a.before($b);
    },

    triggerActions: function triggerActions() {

        var $triggerCart = $(".header-cart__content, .navigation-cart__container"),
            $triggerSearch = $(".navigation__searchTrigger"),
            $triggerSearchMobile = $(".navigation__buttonSearch--mobile"),
            $closeSearch = $(".navigation__closeBar,.navigation__closeBar--mobile"),
            $input = $(".navigation__searchBar [role='textbox']"),
            $a = $('#offCanvasRight'),
            $b = $(".navigation__searchBar"),
            $c = $(".navigation__searchBar--mobile");

        $triggerCart.on("click", function (e) {
            e.preventDefault();
            $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
        });

        $closeSearch.on("click", function (e) {
            e.preventDefault();
            $b.removeClass("active");
            $c.removeClass("active");
        });

        $triggerSearch.on("click", function (e) {
            e.preventDefault();
            $b.toggleClass("active");
            confiGenerales.changePlaceholders();
            $input.focus();
        });

        $triggerSearchMobile.on("click", function (e) {
            e.preventDefault();
            $c.toggleClass("active");
            confiGenerales.changePlaceholders();
            $input.focus();
        });
    },

    mainLazyLoad: function mainLazyLoad() {

        var files = ["https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/8.2.0/lazyload.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        })).then(function () {

            var $productoContainer = $(".producto-prateleira"),
                $producto = $(".producto");

            $productoContainer.each(function () {

                var $thisImg = $(this).find(".producto-prateleira__imagen--url .imagen div"),
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

            var home = new LazyLoad({

                elements_selector: "img",
                threshold: 50,

                callback_load: function callback_load(element) {
                    // console.log("lazy loaded");
                },
                callback_set: function callback_set(element) {
                    // console.log("lazy set");
                },
                callback_processed: function callback_processed(elementsLeft) {
                    // console.log("lazy proceced");
                }

            });

            // }
        }, function err(jqxhr, textStatus, errorThrown) {
            console.log(textStatus);
        });
    },

    FormatoDecimales: function FormatoDecimales(seletor) {

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

    elementosFormato: function elementosFormato() {

        var $ajaxStopElems = '.skuListPrice,.oldPrice, .skuBestInstallmentValue, em.total-cart-em, td.monetary, span.best-price.new-product-price, td.quantity-price.hidden-phone.hidden-tablet,span.payment-value-monetary,span.payment-installments, .producto-prateleira__info--bestPrice div, .producto-prateleira__info--oldPrice div',
            $porcentaje = $('.porcentaje');

        if ($porcentaje.lenght) {

            $porcentaje.each(function () {

                var valor = $(this).text();
                if (valor == 0) {
                    $(this).remove();
                } else {
                    $(this).text(valor.split(',')[0] + '%');
                }
            });
        } else {
            console.log("porcentaje desactivado");
        }

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
                } else {
                    $(this).text(valor.replace(',0', ''));
                }
            });
        }
    },

    accordion: function accordion(trigger, content) {

        var $responsive = $(window).width();

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

    backTop: function backTop() {

        var offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $('.back-to-top');

        //hide or show the "back to top" link
        $(window).scroll(function () {

            $(this).scrollTop() > offset ? $back_to_top.addClass('back-to-top-is-visible') : $back_to_top.removeClass('back-to-top-is-visible back-to-top-fade-out');

            if ($(this).scrollTop() > offset_opacity) {
                $back_to_top.addClass('back-to-top-fade-out');
            }
        });

        //smooth scroll to top
        $back_to_top.on('click', function (event) {

            event.preventDefault();

            $('body,html').animate({
                scrollTop: 0
            }, scroll_top_duration);
        });
    },

    stickyNav: function stickyNav(el) {

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

    megaMenu: function megaMenu(el, exit) {

        var $exit = $("header,.megamenu-buscar.navigation__searchTrigger, main,footer"),
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

                    var $a = $(this).attr("class"),
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

        function menuItems(ele, exit) {
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

    compraAsyncVitrina: function compraAsyncVitrina() {

        var $contentAsync = $(".producto-prateleira__info--precio-container"),
            $btnAsync = $('.btn-add-buy-button-asynchronous');

        $contentAsync.each(function () {

            var $thisBtn = $(this).find($btnAsync);

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

                vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {

                    $('#agregadoExito').foundation('reveal', 'open');
                    console.log(orderForm);
                });
            });
        });
    },

    checkEmptyCart: function checkEmptyCart() {

        var $emptyBag = $(".middle-container__content-popCart .emptyBag"),
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

    quickViewAsyncBuy: function quickViewAsyncBuy() {

        var $iframeContentTop = $('#TB_iframeContent', top.document);

        $iframeContentTop.on("load", function () {

            var $iframeBuySuccess = $(".TB_compraExitosa"),
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
                    success: function success(data) {

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
                    })).then(function () {

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

    refreshMiniCart: function refreshMiniCart() {

        vtexjs.checkout.getOrderForm();
        $("#TB_overlay", document.body).remove();
        $("#TB_window", document.body).remove();
    },

    masterData: function masterData() {

        $('#contacto-submit').on("click", function (e) {

            e.preventDefault();
            contacto();
        });

        $('#newsletter_submit').on("click", function (e) {

            var $femenino = $('#sn_femenino:checked'),
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

                success: function success(data) {

                    $('#NewsAprob').foundation('reveal', 'open');
                    clearData();
                },
                error: function error(data) {

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

                success: function success(data) {

                    $('#NewsAprob').foundation('reveal', 'open');
                    clearData();
                },
                error: function error(data) {

                    $('#NewsError').foundation('reveal', 'open');
                }
            });
        }
    },

    replaceHref: function replaceHref() {

        var $accept = $(".categoria, .departamento, .home, .producto, .resultado-busca, .brand");

        if ($accept.length) {

            var $a = $('.thickbox');

            $a.each(function (key, val) {
                $(val).attr('href', $(val).attr('href').replace("http://", "https://"));
            });
        }
    }

};

/* 

[b2.Home]

============================= */

var home = {

    init: function init() {

        if ($home.length) {
            home.carousel('.home-slide');
        }
    },

    carousel: function carousel(uno) {

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

var producto = {

    init: function () {

        var $producto = $("body.producto");

        if ($producto.length) {

            producto.traducciones();
            producto.qtdControl();
            producto.textoProducto();
            producto.carousel('.carousel-interesar');
            producto.accordion('.product__accordion-trigger','.product__accordion-content');
            producto.compraFichaProducto();
            producto.productoSticky();
            producto.miniatura();
            console.log("controles de producto (●´ω｀●)");
        }

        // producto.elementosFormato();

    },

    traducciones:function () {
        var $breadCrumb = $(".bread-crumb ul li:eq(0)");
        $breadCrumb.html("Página de inicio");
    },

    qtdControl: function () {

        var $btnComprarProduto = $('.buy-button.buy-button-ref'),
            $notifyme = $(this).find(".notifyme.sku-notifyme:visible"),
            qty = { cantidad: "" };

        if ($btnComprarProduto.length) {

            // $btnComprarProduto.on("click", function(){

            //     var $this = $(this),
            //         url   = $this.attr('href');

            //     if( url.indexOf('qty=1') > 0 ){
            //         $this.attr('href', url.replace('qty=1', 'qty='+ parseInt( $('.product__shop-content .box-qtd .qtd').val() ) ) );
            //     }
            // });

            var $recebeQtyForm = $btnComprarProduto.parents('.product__shop-content');

            if ($recebeQtyForm.length) {

                vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

                    // console.log(product.skus[0].availablequantity);
                    qty.cantidad = product.skus[0].availablequantity;

                });

                $recebeQtyForm.prepend(

                    '<div class="pull-left box-qtd">' +
                    '   <input type="text" class="qtd pull-left" value="1" />' +
                    '   <div class="bts pull-left">' +
                    '       <button class="btn btn-mais">+</button>' +
                    '       <button class="btn btn-menos">-</button>' +
                    '   </div>' +
                    '</div>'
                );

                $(document).on('keypress', '.product__shop-content .box-qtd .qtd', function (e) {

                    var tecla = (window.event) ? event.keyCode : e.which;
                    if ((tecla > 47 && tecla < 58)) {
                        return true;
                    } else {
                        if (tecla == 8 || tecla == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });

                $(document).on('keyup', '.product__shop-content .box-qtd .qtd', function (e) {

                    $('.product__shop-content .box-qtd .qtd').val($(this).val());
                });

                $(document).on('blur', '.product__shop-content .box-qtd .qtd', function (e) {

                    var $this = $(this);

                    if ($this.val() === '' || parseInt($this.val()) < 1) {
                        $('.product__shop-content .box-qtd .qtd').val(1);
                    } else {
                        $('.product__shop-content .box-qtd .qtd').val($this.val());
                    }

                });

                $(document).on('click', '.product__shop-content .box-qtd .btn', function () {

                    var $this = $(this),
                        $qtd = $('.product__shop-content .box-qtd .qtd'),
                        valor = parseInt($qtd.val());

                    if ($this.hasClass('btn-mais')) {

                        $qtd.val(valor + 1);

                        if (parseInt($('.product__shop-content .box-qtd .qtd').val()) === qty.cantidad) {
                            console.log("tope de cantidad");
                            $(".btn-mais").prop('disabled', true);
                        } else {
                            console.log("no se está ejecutando el anterior");
                        }

                    } else if ($this.hasClass('btn-menos')) {

                        if (valor > 1) {
                            $qtd.val(valor - 1);
                            $(".btn-mais").removeAttr('disabled');
                        }
                    }

                });

            }

        }

    },

    textoProducto: function () {

        var producto = { id: "", descripcion: "", ean: "", caracteristica: "", stock: "", marca: "", cantidad: "" },
            $ean = $(".ean");

        vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

            producto.stock = product.available;
            producto.cantidad = product.skus[0].availablequantity;

            if (JSON.stringify(producto.stock) === 'false') {

                var $erase = $(".pull-left.box-qtd, .despacho, .producto-sticky-container--compra .buy-button.buy-button-ref, .producto-sticky-container--compra .portal-notify-me-ref, .basica-precio .cuotas-container, .product__available-container"),
                    $toAppend = $(".producto-sticky-container--compra .product__shop-content"),
                    $noDisponible = '<h2 class="no-disponible">Produto no disponible</h2>';

                $erase.remove();
                $toAppend.append($noDisponible);

            } else { console.log("available"); }

            producto.id = product.productId;
            console.log(product);
        });

        $.ajax({
            url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + producto.id + "",
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (data) {
                console.log(data);
                producto.descripcion = data[0]['Descripción Larga'];
                producto.ean = data[0].items[0].ean;
                producto.marca = data[0].brand;

                $ean.append(producto.ean);
                // dotInfo();
            }
        });

        function dotInfo() {

            var $texto = $(".caracteristicas-content .productDescription").text(),
                $container = $(".caracteristicas-content .productDescription"),
                $result = $texto.replace(/\*/g, '<p class="space"></p><span class="dot">• </span>');

            $container.html($result);
        }

    },

    carousel: function (el) {

        $(".helperComplement").remove();

        $(".producto-container__coleccion .prateleira").children().addClass("carousel-interesar");

        $(el).on("init", function () {

            $(this).addClass('active');

        });

        $(el).slick({

            autoplay: true,
            autoplaySpeed: 2500,
            slide: 'li',
            slidesToScroll: 1,
            slidesToShow: 4,
            speed: 500,
            responsive: [
                {
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]

        });

        $('.carousel-interesar, .carousel-agregadoExito').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            confiGenerales.mainLazyLoad();
            // console.log(nextSlide);
        });

    },

    compraFichaProducto: function () {

        var $btnFichaProducto = $(".buy-button.buy-button-ref");

        $btnFichaProducto.unbind('click');

        $btnFichaProducto.bind('click', function () {

            var url = $(this).attr('href').split("?")[1],
                param = url.split("&"),
                $url = $(this).attr('href'),
                $a = $('#offCanvasRight'),
                qtyBox = parseInt($('.product__shop-content .box-qtd .qtd').val()),
                item = {
                    id: param[0].split("=")[1],
                    quantity: qtyBox,
                    // quantity: param[1].split("=")[1], 
                    seller: param[2].split("=")[1]
                };

            vtexjs.checkout.addToCart([item], null, 3).done(function (orderForm) {
                
                var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.5/sweetalert2.all.min.js"];

                $.when.apply($, $.map(files, function (file) {
                    return $.getScript(files);
                }))
                .then(function () {

                    $a.foundation('open', event, "[data-toggle=offCanvasLeft]");

                }, function err(jqxhr, textStatus, errorThrown) {
                    console.log(textStatus);
                });

                console.log(orderForm);

            });

            return false;

        });

    },

    productoSticky: function () {

        var $elShow = $(".producto-sticky-container"),
            $responsive = $(window).width();

        if ($responsive > 768) {

            console.log("true");

            $(window).scroll(function () {

                if ($(this).scrollTop() > 800) {

                    $elShow.addClass('sticky', 500);
                    $elShow.removeClass('fixed');

                } else {

                    $elShow.removeClass('sticky fixed', 500);

                }

            });

        } else if ($responsive < 768) {

            console.log("NOT true");

            $(window).scroll(function () {

                if ($(this).scrollTop() > 1) {

                    $elShow.addClass('sticky', 500);
                    $elShow.removeClass('fixed');

                } else {

                    $elShow.removeClass('sticky fixed', 500);

                }

            });

        }

    },

    miniatura: function () {

        miniaturaActiva();
        miniaturaCarrusel();

        function miniaturaActiva() {

            var $el = $(".product__img-container .thumbs li"),
                $element = $(".product__img-container .thumbs li:eq(0)"),
                $otherImgs = $(".product__img-container .thumbs li");

            if ($el.length > 0) {

                $element.addClass('active');

                $otherImgs.each(function () {
                    $(this).on("click", function () {
                        $(this).addClass('active');
                        $(this).siblings().removeClass('active');
                    });
                });

            }
        }

        function miniaturaCarrusel() {

            var $el = $(".product__img-container .thumbs li"),
                $init = $(".product__img-container .thumbs"),
                $responsive = $(window).width();

            if ($responsive < 1024) {

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
                        useTransform: true,
                        vertical: false

                    });

                }

            } else {

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
                        useTransform: true,
                        vertical: true

                    });

                }

            }

        }

    },

    accordion: function (trigger, content) {

        $(content).hide();

        $(trigger).on("click", function () {
            $(this).toggleClass("active").next().slideToggle("slow");
            return false;
        });
    },
};

/* 

[b4.Categ/depto]

============================= */

/* 

[b5.Busca, resultado de busca, 404 y error 500]

============================= */

var busca = {
    init: function init() { },

    fraseBusqueda: function fraseBusqueda() {

        var $buscavazia = $(".estatico.buscavazia"),
            $resultadoBusca = $(".resultado-busca"),
            $productoEncontrado = $(".vitrine.resultItemsWrapper");

        if ($buscavazia.length) {

            var href = window.location.href,
                url = href.split('=')[1],
                $el = $(".frase__content");

            $el.append(url);
        } else if ($resultadoBusca.length) {

            var hrefUrl = window.location.href,
                theUrl = hrefUrl.split('/')[3],
                $body = $("body.resultado-busca"),
                $parent = $(".resultado-content"),
                $ele = $(".resultado-content .resultado"),
                $template = '<div class="cuatro__container"> <div class="cuatro__container--img"> <img src="/arquivos/sbr-sin-resultado.png" /> </div> <div class="cuatro__container--texto"> <div class="texto__content">Sua busca para:<strong class="resultado">' + theUrl + '</strong>não encontrou nenhum resultado.</div> </div> </div>';

            if ($productoEncontrado.length) {

                $ele.append(theUrl);
            } else {

                $body.addClass('no-encontro');
                $parent.html($template);
            }
        }
    },

    resultadoBusqueda: function resultadoBusqueda() {

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
    }
};

/* 

[b6.Account]

============================= */