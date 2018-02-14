/*----------------------------inicio--------------------------------

[js - principal ]

Projecto:  Tumi México - 2017
Version: 0.1
Ultimo cambio: 14/02/2018
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
b7.Quickview
b8.Static

-------------------------fin---------------------------------*/


/* 

[a0.Globales]

============================= */

var $body = $("body"),
    $home = $(".home"),
    $static = $(".static.help"),
    $categDeptoBuscaResultadoBusca = $(".categoria, .depto, .busca, .resultado-busca"),
    $producto = $(".producto"),
    $responsive = $(window).width(),
    clog = console.log;

/* 

[b0.Init]

============================= */

$(function () {
    $(document).foundation();
    if ($static.length == 0) {
        confiGenerales.init();
        static.init();
    }
    home.init();
    producto.init();
    categDepto.init();
    busca.init();
    quickviewControl.init();
    BarbaWidget.init();
});

/* 

[b1.Configuraciones generales]

============================= */

var confiGenerales = {

    init: function () {

        // confiGenerales.mainLazyLoad();
        // confiGenerales.FormatoDecimales();
        confiGenerales.stickySearch();
        confiGenerales.infoTab();
        confiGenerales.triggerActions();
        confiGenerales.elementosFormato();
        // confiGenerales.accordion('.footer__title', '.footer__elements');
        confiGenerales.backTop();
        // confiGenerales.stickyNav();
        confiGenerales.megaMenu('header,.megamenu-buscar.navigation__searchTrigger, main, footer, .navigation__right');
        confiGenerales.compraAsyncVitrina();
        confiGenerales.checkEmptyCart();
        confiGenerales.masterData();
        confiGenerales.sliderStatic();
        //confiGenerales.modalStatic();
        confiGenerales.replaceHref();
        confiGenerales.bodyPaint();
        $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
            // console.log("actualizó");
            confiGenerales.checkEmptyCart();
        });
        console.log("confiGenerales.init()  ˙ω˙");
    },

    stickySearch: function () {
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
    sliderStatic: function () {
        $(".corpGiving .tab").click(function () {
            $(".corpGiving").removeClass("slide1 slide2");
            $(".corpGiving").addClass("slide" + ($(this).index() + 1));
        });
    },
    /*modalStatic: function () {
        $(".environment .readMore").click(function(e){
            e.preventDefault();
            var parent = $(this).parents('table'),
                info = $(this).parents('.bottomRow').find('.moreInfoBlock .' + $(this).attr('id'));
            
            if(!parent.hasClass('dimmed')) {
                parent.addClass('dimmed');
                info.removeClass('hidden');
                info.css('marginTop', (parent.height() - info.height())/2);
            }
        });

        $(".environment .moreInfoLayer .closeBtn span").click(function(e){
            e.preventDefault();
            $(".environment table").removeClass('dimmed');
            $(this).parents('.moreInfoLayer').addClass('hidden');
            $('.overlayforpopup').addClass('hidden');
        });
        
        $(".cntr-environment-blocks .readMore").click(function(e){
            e.preventDefault();
            var parent = $(this).parents('ul'),
                info = $(this).parents('.bottomRow').find('.moreInfoBlock .' + $(this).attr('id'));
            
        
            if($('.overlayforpopup').hasClass('hidden')) {
                $('.overlayforpopup').removeClass('hidden');
                info.removeClass('hidden');
                info.css('marginTop', (parent.height() - info.height())/2);
            }
        });
        $('.cntr-environment-blocks').carousel({
            itemsPerTransition: '1',
            nextPrevActions: true,
            pagination: false,
            continuous: false,
            insertPrevAction: function () {
                return $('<a href="#" class="rs-carousel-action rs-carousel-action-prev"><span class="icon icon-prev"></span></a>').appendTo('#prev-env');
            },
            insertNextAction: function (){
                return $('<a href="#" class="rs-carousel-action rs-carousel-action-next"><span class="icon icon-next"></span></a>').appendTo('#next-env');
            }
        });
        
    }, */
    infoTab: function () {
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

    changePlaceholders: function () {
        var $a = $(".btn-buscar"),
            $b = $("<div class='search__icon'></div>"),
            $c = $(".search__icon");
        $a.attr({
            placeholder: " ",
            value: " "
        });
        $c.length ? console.log("˙ω˙ icono agregado") : $a.before($b);
    },

    triggerActions: function () {

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

    mainLazyLoad: function () {

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

    formatoDecimales: function (seletor) {

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

    accordion: function (trigger, content) {

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

    // stickyNav: function (el) {

    //     $("#mobile-nav").removeClass('sticky');

    //     $(window).scroll(function () {

    //         if ($(this).scrollTop() > 1) {

    //             $(el).addClass('sticky');
    //             $(el).removeClass('fixed');
    //             $("#mobile-nav").addClass('sticky');
    //         } else {

    //             $(el).removeClass("sticky");
    //             $("#mobile-nav").removeClass('fixed sticky');
    //         }
    //     });
    // },

    stickyNav: function () {

        var files = ["https://cdnjs.cloudflare.com/ajax/libs/headroom/0.9.4/headroom.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        })).then(function () {

            $("#mobile-nav").removeClass('sticky');

            var myElement = document.getElementById('main-nav'),
                headroom = new Headroom(myElement);
            headroom.init();

        }, function err(jqxhr, textStatus, errorThrown) {
            console.log(textStatus);
        });
    },

    megaMenu: function (exit) {

        if ($responsive > 768) {

            var $navigationMenuItem = $('.navigation__menu a'),
                $megamenu = $(".navigation__megamenu-content");

            $navigationMenuItem.each(function () {
                $(this).on("mouseenter", function () {
                    var $menuItemAttr = $(this).attr("class");

                    confiGenerales.menuItems($(this), exit);

                    $megamenu.each(function () {
                        var $megamenuAttr = $(this).attr("id");
                        if ($menuItemAttr.indexOf($megamenuAttr) > -1) {
                            $(this).addClass('display');
                            $(this).siblings().removeClass('display');
                        }
                    });

                    $(exit).on("mouseenter", function () {
                        $megamenu.removeClass("display");
                    });
                });
            });

        }
    },

    menuItems: function (ele, exit) {
        ele.addClass("active");
        ele.siblings().removeClass("active");

        $(exit).on("hover", function () {
            ele.removeClass("active");
            $(exit).removeClass("active");
        });
    },

    compraAsyncVitrina: function () {

        var $contentAsync = $(".prateleira__price-container"),
            $btnAsync = $('.btn-add-buy-button-asynchronous');

        $contentAsync.each(function () {

            var $thisBtn = $(this).find($btnAsync);

            $thisBtn.unbind('click');

            $thisBtn.bind('click', function (e) {

                var $a = $('#offCanvasRight'),
                    url = $(this).attr('href').split("?")[1],
                    param = url.split("&"),
                    item = {
                        id: param[0].split("=")[1],
                        quantity: param[1].split("=")[1],
                        seller: param[2].split("=")[1]
                    };

                e.preventDefault();

                vtexjs.checkout.addToCart([item], null, 3).done(function (orderForm) {
                    $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                    setTimeout(function () {
                        $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
                    }, 2000);
                    console.log(orderForm);
                });
            });
        });
    },

    checkEmptyCart: function () {

        var $emptyBag = $(".middle-container__content-popCart .emptyBag"),
            $NoEmptyBag = $(".middle-container__content-popCart .emptyBag.active"),
            $cartNumber = $(".middle-container__content-cart"),
            $cartFooter = $(".middle-container__content-popCart .cartFooter"),
            $monto = $(".middle-container__content-popCart .vtexsc-text").text().replace('R$', ''),
            $montoValor = parseFloat($monto);

        // console.log($montoValor);

        if ($montoValor == 0) {

            // console.log("miniCart vacío");
            // confiGenerales.mainLazyLoad();

            $emptyBag.addClass("active");
            $cartNumber.removeClass("active");
            $cartFooter.removeClass("clearfix");
        }
        if ($montoValor > 0) {

            // confiGenerales.mainLazyLoad();

            // console.log("miniCart tiene productos");

            $NoEmptyBag.removeClass("active");
            $cartNumber.addClass("active");
            $cartFooter.removeClass("clearfix");
        }
    },

    masterData: function () {

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

    replaceHref: function () {

        var $accept = $(".categoria, .depto, .home, .producto, .resultado-busca, .brand");

        if ($accept.length) {

            var $a = $('.thickbox');

            $a.each(function (key, val) {
                $(val).attr('href', $(val).attr('href').replace("http://", "https://"));
            });
        }
    },

    bodyPaint: function () {
        $body.fadeTo(500, 1);
    }

};

/* 

[b2.Home]

============================= */

var home = {

    init: function init() {

        if ($home.length) {
            home.carousel('.home-slide', '.carousel-news');
            console.log("home.init()  ˙ω˙");
        }
    },
    carousel: function carousel(main, producto) {

        var $count = $(".home__tabs-content.news .prateleira").find(".img");

        $(".helperComplement").remove();
        $(".home__tabs-content.news .prateleira").children().addClass("carousel-news");

        if ($responsive > 758) {
            if ($count.length > 6) {
                $(producto).slick({
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 2,
                    slidesToShow: 6,
                    speed: 500,
                    dots: true,
                    responsive: [{
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 650,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }]
                });
            }
        }

        $(main).slick({

            arrows: true,
            autoplay: true,
            autoplaySpeed: 2500,
            button: false,
            dots: false,
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

            producto.mainImgCarousel();
            producto.traducciones();
            producto.qtdControl();
            producto.textoProducto();
            producto.carousel('.carousel-recomendados,.carousel-vistosReciente');
            producto.accordion('.product__accordion-trigger', '.product__accordion-content');
            producto.compraFichaProducto();
            // producto.productoSticky();
            producto.miniatura();
            setTimeout(producto.userReview, 3000);
            console.log("producto.init()  ˙ω˙");
        }

        // producto.elementosFormato();

    },
    mainImgCarousel: function () {

        var mainProductId;

        if ($responsive <= 725) {

            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
                console.log(product.productId);
                mainProductId = product.productId;
            });

            $.ajax({
                url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + mainProductId + "",
                dataType: 'json',
                type: 'GET',
                crossDomain: true,
                success: function success(data) {
                    console.log(data[0].items[0].images);

                    var arr = data[0].items[0].images,
                        $zoomPad = $(".product__img--mobile .zoomPad"),
                        $elements = [];

                    $.each(arr, function (i, val) {
                        var a = val.imageTag,
                            b = a.replace(/[#~]/g, "").replace(/-width-\b/g, "-600-").replace(/-height\b/g, "-600").replace(/\s*(width)="[^"]+"\s*/g, " width='600'").replace(/\s*(height)="[^"]+"\s*/g, " height='600'"),
                            $el = '<div class="slide-thumb">' + b + '</div>';
                        $elements.push($el);
                    });

                    $zoomPad.html($elements);

                    $zoomPad.slick({
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
                        useTransform: true
                    });
                }
            });

        }
    },
    traducciones: function () {
        var $breadCrumb = $(".bread-crumb ul li:eq(0)");
        $breadCrumb.html("<a href='/'>Home</a>");
    },
    userReview: function () {
        var $buttonReview = $("#lnkPubliqueResenha"),
            $content = $("#publishUserReview"),
            $target = "#userReview";

        $buttonReview.on("click", function () {
            console.log("se ejecuto");
            $content.appendTo($target);
            openModal($target);
        });

        function openModal(modal) {
            $(modal).foundation("open");
        }
    },
    qtdControl: function () {

        var $btnComprarProduto = $('.buy-button.buy-button-ref'),
            $notifyme = $(this).find(".notifyme.sku-notifyme:visible"),
            $templateQty = '<div class="pull-left box-qtd"><input type="text" class="qtd pull-left" value="1" /><div class="bts pull-left"><button class="btn btn-mais">+</button><button class="btn btn-menos">-</button></div></div>',
            qty = {
                cantidad: ""
            };

        if ($btnComprarProduto.length) {

            var $recebeQtyForm = $('.product__sku-container, .product__shop-content');

            if ($recebeQtyForm.length) {

                vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
                    // console.log(product.skus[0].availablequantity);
                    qty.cantidad = product.skus[0].availablequantity;
                });

                $recebeQtyForm.prepend($templateQty);

                $(document).on('blur', '.product__shop-content .box-qtd .qtd, .product__sku-container .box-qtd .qtd', function (e) {

                    var $this = $(this);

                    if ($this.val() === '' || parseInt($this.val()) < 1) {
                        $('.product__shop-content .box-qtd .qtd, .product__sku-container .box-qtd .qtd').val(1);
                    } else {
                        $('.product__shop-content .box-qtd .qtd, .product__sku-container .box-qtd .qtd').val($this.val());
                    }

                });

                $(document).on('click', '.product__shop-content .box-qtd .btn, .product__sku-container .box-qtd .btn', function () {

                    var $this = $(this),
                        $qtd = $('.product__shop-content .box-qtd .qtd, .product__sku-container .box-qtd .qtd'),
                        valor = parseInt($qtd.val());

                    if ($this.hasClass('btn-mais')) {

                        $qtd.val(valor + 1);

                        if (parseInt($('.product__shop-content .box-qtd .qtd, .product__sku-container .box-qtd .qtd').val()) === qty.cantidad) {
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

        var producto = {
                id: "",
                descripcion: "",
                ean: "",
                caracteristica: "",
                stock: "",
                marca: "",
                cantidad: ""
            },
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

            } else {
                console.log("available");
            }

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

        var $count = $(".product__recomended-content .prateleira").find(".img"),
            $responsive = $(window).width();

        $(".helperComplement").remove();
        $(".product__recomended-content .prateleira").children().addClass("carousel-recomendados");
        $(".product__recently-content .prateleira").children().addClass("carousel-vistosReciente");

        $(el).on("init", function () {
            $(this).addClass('active');
        });

        if ($responsive > 768) {

            if ($count.length > 3) {
                $(el).slick({

                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    speed: 500,
                    dots: true,
                    responsive: [{
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
            }
        } else {
            $(el).slick({

                autoplay: true,
                autoplaySpeed: 2500,
                slide: 'li',
                slidesToScroll: 1,
                slidesToShow: 4,
                speed: 500,
                dots: true,
                responsive: [{
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
        }

        $('.carousel-recomendados,.carousel-vistosReciente').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            // confiGenerales.mainLazyLoad();
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
                qtyBox = parseInt($('.product__sku-container .box-qtd .qtd').val()),
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
                })).then(function () {

                    $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                    setTimeout(function () {
                        $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
                    }, 2000);

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
        // miniaturaCarrusel();

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
    }
};

/* 

[b4.Categ/depto]

============================= */

var categDepto = {

    init: function () {

        var $categDepto = $("body.depto, body.categoria, body.resultado-busca, body.brand"),
            $mix = ("body.depto, body.categoria, body.resultado-busca, body.estatico.buscavazia, body.resultado-busca.no-encontro.no-encontro-filtros");

        if ($categDepto.length) {

            categDepto.carouselPrateleira();
            categDepto.categDeptoAccordion('.search-multiple-navigator h4,.search-multiple-navigator h5', '.search-multiple-navigator h3');
            categDepto.asideSticky('.categ__aside .navigation-tabs, .categ__aside .navigation');
            categDepto.categOptions();
            categDepto.traducciones();
            // categDepto.infinityScroll();
            categDepto.skuImgPrateleira();
            categDepto.eventHasChange();
            //setInterval(categDepto.traducciones,800);
            setInterval(confiGenerales.mainLazyLoad, 800);
            console.log("categDepto.init()  ˙ω˙");

        }

    },
    traducciones: function () {
        var $breadCrumb = $(".bread-crumb ul li:eq(0)");
        $breadCrumb.html("<a href='/'>Home</a>");
    },
    carouselPrateleira: function () {

        if ($responsive > 768) {

            var catalogProductId,
                $prat = $(".prateleira__container");

            $prat.each(function () {

                $(this).on("mouseenter", function () {
                    var _thisParent = $(this).parent().find(".prateleira__price-container"),
                        _thisImg = $(this).find(".prateleira__img .img"),
                        $loader = $(this).find(".prateleira__imgLoader"),
                        $validate = $(this).find(".slick-slide"),
                        $img = $(this).find(".prateleira__img"),
                        $template = '<div class="slide-thumb hover"></div>',
                        $pratContent = $(this).find(".prateleira__content");

                    if ($validate.length > 0) {
                        console.log("vitrina ejecutada");
                    } else if ($validate.length == 0) {

                        $($template).prependTo(_thisImg);

                        _thisParent.each(function () {
                            var _thisId = $(this).find(".wrapper-buy-button-asynchronous").attr("class").split("bba")[1];
                            catalogProductId = _thisId;
                            // console.log(_thisId);

                            $.ajax({
                                url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + catalogProductId + "",
                                dataType: 'json',
                                type: 'GET',
                                crossDomain: true,
                                success: function success(data) {
                                    // console.log(data[0].items[0].images);

                                    var arr = data[0].items[0].images,
                                        $elements = [];

                                    $.each(arr.slice(1, 10), function (i, val) {
                                        var a = val.imageTag,
                                            b = a.replace(/[#~]/g, "").replace(/-width-\b/g, "-350-").replace(/-height\b/g, "-350").replace(/\s*(width)="[^"]+"\s*/g, " width='350'").replace(/\s*(height)="[^"]+"\s*/g, " height='350'"),
                                            $el = '<div class="slide-thumb hover">' + b + '</div>';
                                        // console.log(b);
                                        $elements.push(b);
                                        _thisImg.append($el);
                                    });

                                    var z = '' + $elements[0] + '',
                                        $slickThumb = _thisImg.find(".slide-thumb.hover"),
                                        $slickThumbLast = _thisImg.find(".slide-thumb:last-child");

                                    $slickThumbLast.remove();
                                    _thisImg.find("img:eq(0)").appendTo($slickThumb);

                                    if (_thisImg.length) {

                                        _thisImg.slick({
                                            arrows: true,
                                            autoplay: false,
                                            autoplaySpeed: 2500,
                                            button: false,
                                            dots: false,
                                            fade: true,
                                            infinite: true,
                                            slidesToScroll: 1,
                                            slidesToShow: 1,
                                            speed: 800,
                                            useTransform: true
                                        });
                                        $img.on("click", function (e) {
                                            e.preventDefault();
                                        });
                                        if ($slickThumb.length) {
                                            // console.log("cantidad de slicks-thumbs!: " + $slickThumb.length);
                                            $(z).appendTo($slickThumb);
                                            // $slickThumb.css("border", "1px solid red");
                                        }

                                    }
                                }
                            });
                        });
                    }
                });
            });

        }
    },
    categDeptoAccordion: function (trigger, secondTrigger) {

        var $categDepto = $(".depto, .categoria, .resultado-busca");

        if ($categDepto.length) {

            var $open = $(".HideGRUPO-DE-COR"),
                $marca = $(".navigation-tabs .Marca, .navigation-tabs h5.Hide.HideMarca"),
                $activeColor = $(".GRUPO.DE.COR.even, .GRUPO.DE.COR.Atributos, .GRUPO.DE.COR,.GRUPO.DE.COR.even.Características"),
                $otherMenuOpen = $(".Hide.even.Atributos.HideGRUPO-DE-COR, .Hide.even.Características.HideESTRUTURA,.ESTRUTURA, .Hide.even.Características.HideGRUPO-DE-COR, .Hide.Atributos.HideTalla,.Hide.Atributos.HideColeccion"),
                $content = $('.navigation-tabs .search-single-navigator ul'),
                $verFiltros = $content.find('.ver-filtros');

            // $otherMenuOpen = $(".Hide.even.Atributos.HideForma, .Hide.even.Atributos.HideColeccion,.even.Atributos.Forma,.Hide.Atributos.HideForma,.Hide.Atributos.HideColeccion, .Atributos.Coleccion, .Atributos.Forma, .Atributos.Grupo-Color, .HideFaixa-de-preco, .Faixa-de-preco");

            $(trigger).next().hide();

            $(secondTrigger).next().hide();

            $(secondTrigger).next().next().hide();

            $(trigger).on("click", function () {

                $(this).toggleClass("active").next().slideToggle("slow");

                if ($(".categ__aside .HideGRUPO-DE-COR.active").length) {

                    console.log("true");
                    $activeColor.css({
                        "display": "flex",
                        "flex-flow": "row wrap",
                        "justify-content": "flex-start"
                    });

                } else {
                    console.log("false");
                }
                return false;
            });

            $(secondTrigger).on("click", function () {
                $(this).toggleClass("active").nextAll("h4,.filtro-ativo").slideToggle("slow");
                return false;
            });

            if ($verFiltros.length) {
                $verFiltros.parent().prev().addClass('selected').next().slideDown();
            }

            // $open.on("click", function(){
            //     $activeColor.toggleClass("active");
            // });

            // $activeColor.addClass("active").next().slideToggle("slow");
            // $activeColor.toggleClass("active").next().slideToggle("slow");
            $otherMenuOpen.addClass("active").next().slideToggle("slow");

            if ($open.hasClass('active')) {
                $activeColor.css({
                    "display": "flex",
                    "flex-flow": "row wrap",
                    "justify-content": "flex-start"
                });
            }

            // $marca.css({
            //     "display": "block"
            // });

        }

    },
    asideSticky: function (trigger) {

        var files = ["/arquivos/hc-sticky.min.js"];

        $.when.apply($, $.map(files, function (file) {
                return $.getScript(files);
            }))
            .then(function () {

                $(trigger).hcSticky({
                    top: 80,
                    bottomEnd: 100,
                    responsive: true
                });

            }, function err(jqxhr, textStatus, errorThrown) {
                // handle error
            });

    },
    infinityScroll: function () {

        var files = ["/arquivos/QD_infinityScroll.min.js"];

        $.when.apply($, $.map(files, function (file) {
                return $.getScript(files);
            }))
            .then(function () {

                console.log("cargo el infinity");

                var $desktop = $(".prateleira[id*=ResultItems]:first");

                if ($responsive > 650) {

                    // console.log("tablet pa arriba");

                    $desktop.QD_infinityScroll({
                        // Última prateleira/vitrine na página
                        lastShelf: ">div:last",
                        // Elemento com mensagem de carregando ao iniciar a requisição da página seguinte
                        elemLoading: '<!-- Infinity Scroll - Loading message --><div id="scrollLoading" class="qd-is-loading">Cargando...</div>',
                        // Opção p/ definir a URL manualmente, ficando automático apenas a paginação. A url deve terminar com "...&PageNumber="
                        searchUrl: null,
                        // Define em qual seletor a ação de observar a rolagem será aplicado (ex.: $(window).scroll(...))
                        scrollBy: document,
                        // Callback quando uma requisição ajax da prateleira é completada
                        callback: function () {
                            console.log("se cargaron más productos desktop");
                            confiGenerales.replaceHref();
                            confiGenerales.wishlistOnclick();
                            confiGenerales.compraAsyncVitrina();
                            // confiGenerales.mainLazyLoad();
                        },
                        // Cálculo do tamanho do footer para que uma nova página seja chamada antes do usuário chegar ao "final" do site
                        getShelfHeight: function ($this) {
                            return ($this.scrollTop() + $this.height());
                        },
                        // Opção para fazer a paginação manualmente, uma nova página só é chamada quando executado o comando dentro desta função. Útil para ter um botão "Mostrar mais produtos"
                        // Ela recebe como parâmetro: 1 função que chama a próxima página (caso ela exista)
                        paginate: null,
                        // Esta função é quem controla onde o conteúdo será inserido. Ela recebe como parâmetro: O ùltimo bloco inserido e os dados da nova requisição AJAX
                        insertContent: function (currentItems, ajaxData) {
                            currentItems.after(ajaxData);
                        },
                        // Função para permitir ou não que a rolagem infinita execute na página esta deve retornar "true" ou "false"
                        authorizeScroll: function () {
                            return true;
                        }
                    });

                }

            }, function err(jqxhr, textStatus, errorThrown) {
                // handle error
            });

    },
    categOptions: function () {

        var $filterBy = $('.filterBy'),
            $btnFilter = $(".categ__btn-filter"),
            $aside = $(".categ__aside"),
            $categProducts = $(".categ__products"),
            $categElements = $(".categ__elements"),
            $pager = $(".pager.top"),
            $compare = $categDeptoBuscaResultadoBusca.find(".compare:eq(0)"),
            $containerCompare = $(".categ__compare"),
            $containerFilter = $(".categ__filters"),
            $categTitle = $(".categ__title"),
            $categDescripcion = $(".categ__description"),
            $mix = $(".categ__content"),
            $categOptionsBottom = $(".categ__options-bottom"),
            $navigatorInput = $("input"),
            $currentPage = $(".page-number.pgCurrent"),
            $prevArrow = $(".previous.pgEmpty"),
            $resizeCarousel = $(".prateleira__img .img.slick-initialized"),
            $effectOut = function (el) {
                return el.fadeOut(500);
            },
            $effectIn = function (el) {
                return el.fadeIn(500);
            },
            $searchResultsTime = $(".searchResultsTime:eq(0), .sub:eq(0)");

        if ($compare.length) {
            $compare.appendTo($containerCompare);
        }
        $categTitle.html("Mochilas y Macutos");
        $categDescripcion.html("Modernas, duraderas, cómodas y elegantes. Nuestras mochilas y bandoleras son perfectas para profesionales y estudiantes. Encontrará desde mochilas para portátiles, bolsos para fin de semana y mucho más.");
        $searchResultsTime.appendTo($containerFilter);
        $filterBy.html($filterBy.children().eq("0").remove());
        $containerFilter.append($pager);
        $categOptionsBottom.clone().appendTo(".categ__products").addClass("bottom");
        $navigatorInput.on("click", function () {
            if ($(this).attr('checked')) {
                $(this).attr('checked', 'checked');
            } else {
                $(this).removeAttr('checked');
            }
        });
        $btnFilter.toggle(function () {
            $(this).text("Mostrar Filtros").addClass("active");
            $(".slick-next.slick-arrow").click();
            $.when($effectOut($categElements)).done(function () {
                $aside.addClass("hide");
                $categProducts.addClass("active");
                $effectIn($categElements);
            });
        }, function () {
            $(this).text("Ocultar Filtros").removeClass("active");
            $(".slick-next.slick-arrow").click();
            $.when($effectOut($categElements)).done(function () {
                $aside.removeClass("hide");
                $categProducts.removeClass("active");
                $effectIn($categElements);
            });
        });

        var $pagesAmount = $(".categ__options-bottom.bottom .pager.top .page-number").length,
            $template = '<li class="pager__count"></li>',
            $addTo = $(".next.pgEmpty"),
            $pagerCount = $(".pager__count");

        $addTo.before($template);
        setTimeout(function () {
            $(".pager__count").each(function () {
                $(this).text($pagesAmount);
            });
        }, 800);
        $currentPage.each(function () {
            if ($(this).text() == "1") {
                $prevArrow.addClass("hide");
                $(".categ__options-bottom.bottom .previous.pgEmpty").addClass("hide");
            } else {
                $prevArrow.removeClass("hide");
                $(".categ__options-bottom.bottom .previous.pgEmpty").removeClass("hide");
            }
        });

    },
    skuImgPrateleira: function(){

        var $prateleiraInfo = $(".prateleira__info");

        $prateleiraInfo.each(function(){
            var $this = $(this),
                $skuInput = $this.find(".insert-sku-checkbox"),
                skuInputAttr = $skuInput.attr("rel");
            $this.on("hover",function(){
                $.ajax({
                    url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=skuId:" + skuInputAttr + "",
                    dataType: 'json',
                    type: 'GET',
                    crossDomain: true,
                    success: function success(data) {
                        console.log(data);
                    }
                });
            });
        });
    },
    eventHasChange: function(){

        // var files = ["/arquivos/jquery-hasChange.min.js"];

        // $.when.apply($, $.map(files, function (file) {
        //     return $.getScript(files);
        // })).then(function () {

        //     // Bind the event.
        //     $(window).hashchange();
        //     $(window).hashchange(function () {
        //         console.log("test hasChange");
        //         categDepto.carouselPrateleira();
        //     });

        // }, function err(jqxhr, textStatus, errorThrown) {
        //     console.log(textStatus);
        // });
        $(window).bind('hashchange', function () {
            // console.log("cambio");
            setTimeout(categDepto.carouselPrateleira, 1200);
        });
    }
};

/* 

[b5.Busca, resultado de busca, 404 y error 500]

============================= */

var busca = {
    init: function init() {
        busca.fraseBusqueda();
        busca.resultadoBusqueda();
    },

    fraseBusqueda: function () {

        var $buscavazia = $(".static.buscavazia, .static.cuatro"),
            $resultadoBusca = $(".resultado-busca");

        if ($buscavazia.length) {

            var href = window.location.href,
                url = href.split('=')[1],
                $el = $(".buscavacia__text-result"),
                $searchTrigger = $(".navigation__searchTrigger,.navigation__buttonSearch--mobile"),
                $linkToTrigger = $(".buscavazia__searchTrigger,.errorCuatro__searchTrigger");

            $el.append(url);
            $linkToTrigger.on("click", function () {
                $searchTrigger.click();
            });
        } else if ($resultadoBusca.length) {

            var hrefUrl = window.location.href,
                theUrl = hrefUrl.split('/')[3],
                $body = $("body.resultado-busca"),
                $parent = $(".categ__container"),
                $productoEncontrado = $(".vitrine.resultItemsWrapper"),
                $template = '< div class="buscavacia__text-content" > <h1 class="buscavacia__text-title">Lo sentimos, no se han encontrado resultados para:</h1> <p class="buscavacia__text-result"></p> <div class="buscavacia__searchAgain"> <h3>Intenta una nueva búsqueda haciendo click</h3> <a href="#" class="buscavazia__searchTrigger">aquí</a> </div> </div>',
                $ele = $(".resultado-content .resultado");

            if ($productoEncontrado.length) {
                console.log("hay productos");
            } else {
                $body.addClass('no-encontro');
                $parent.html($template);
                $(".buscavacia__text-result").html(theUrl);
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
                $btnFilter = $(".categ__btn-filter, .categ__btn-filter--mobile"),
                $hideSideBar = $(".categ__aside");

            if ($filter.length == 0) {

                $hideSideBar.remove();
                $btnFilter.hide();
                $body.addClass("no-encontro-filtros");
                $btnFilter.click();
            }
            // if (coleccion.includes('busca?fq')) {
            //     $coleccionParent.html("Os resultados da <strong>coleção</strong> são:");
            // }

            // $resultText.html(decodeURIComponent(urlText));
        }
    }
};

/* 

[b6.Account]

============================= */

/* 

[b7.Quickview]

============================= */

var quickviewControl = {

    init: function () {
        quickviewControl.quickViewAsyncBuy();
    },
    quickViewAsyncBuy: function () {

        var $iframeContentTop = $('#TB_iframeContent', top.document);

        $iframeContentTop.on("load", function () {

            var $iframeBuySuccess = $(".TB_compraExitosa"),
                $thisBtn = $(".buy-button.buy-button-ref"),
                $ean = $("#quickview__style-number"),
                producto = {
                    id: "",
                    descripcion: "",
                    ean: "",
                    caracteristica: "",
                    stock: "",
                    marca: "",
                    url: ""
                },
                $productoName = $(".notifyme-client-name"),
                $productoEmail = $(".notifyme-client-email");

            // $productoName.attr("placeholder", "NOMBRE");
            // $productoEmail.attr("placeholder", "EMAIL");

            quickviewControl.qtdControl();

            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

                producto.stock = product.available;
                producto.id = product.productId;
                console.log(product);

                $.ajax({
                    url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + producto.id + "",
                    dataType: 'json',
                    type: 'GET',
                    crossDomain: true,
                    success: function (data) {

                        var arr = data[0].items[0].images,
                            apiUrl = data[0].linkText,
                            thisUrl = '/' + apiUrl + '/p',
                            details = $(".quickview__productDetail a"),
                            $zoomPad = $(".quickview__img-content .zoomPad"),
                            $elements = [];

                        details.on("click", function () {
                            window.top.location.href = thisUrl;
                        });
                        // console.log(data[0].items[0].images);
                        // producto.descripcion = data[0]['Descripción Larga'];
                        // producto.caracteristica = data[0].Características[0];
                        producto.descripcion = data[0].description;
                        producto.ean = data[0].items[0].ean;
                        producto.marca = data[0].brand;

                        console.log(data);

                        $.each(arr, function (i, val) {
                            var a = val.imageTag,
                                b = a.replace(/[#~]/g, "").replace(/-width-\b/g, "-600-").replace(/-height\b/g, "-600").replace(/\s*(width)="[^"]+"\s*/g, " width='600'").replace(/\s*(height)="[^"]+"\s*/g, " height='600'"),
                                $el = '<div class="slide-thumb">' + b + '</div>';
                            $elements.push($el);
                        });

                        $zoomPad.html($elements);

                        $zoomPad.slick({
                            arrows: true,
                            autoplay: false,
                            autoplaySpeed: 2500,
                            button: false,
                            dots: true,
                            fade: false,
                            infinite: true,
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            speed: 800,
                            useTransform: true
                        });
                    }
                });

                $thisBtn.unbind('click');

                $thisBtn.bind('click', function (e) {

                    var url = $(this).attr('href').split("?")[1],
                        param = url.split("&"),
                        qtyBox = parseInt($('.product__sku-container .box-qtd .qtd').val()),
                        item = {
                            id: param[0].split("=")[1],
                            // quantity: param[1].split("=")[1],
                            quantity: qtyBox,
                            seller: param[2].split("=")[1]
                        };

                    e.preventDefault();

                    vtexjs.checkout.getOrderForm().done(function (e) {

                        vtexjs.checkout.addToCart([item], null, 3).done(function (orderForm) {
                            window.parent.quickviewControl.refreshMiniCart();
                        });
                    });
                });

            }); // /.fin getCurrentProductWithVariations.
        });
    },
    refreshMiniCart: function () {
        var $a = $('#offCanvasRight');

        vtexjs.checkout.getOrderForm();
        $("#TB_overlay", document.body).remove();
        $("#TB_window", document.body).remove();
        $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
        setTimeout(function () {
            $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
        }, 2000);
    },
    qtdControl: function () {

        var $btnComprarProduto = $('.buy-button.buy-button-ref'),
            $notifyme = $(".notifyme.sku-notifyme:visible"),
            $templateQty = '<div class="pull-left box-qtd"><input type="text" class="qtd pull-left" value="1" /><div class="bts pull-left"><button class="btn btn-mais">+</button><button class="btn btn-menos">-</button></div></div>',
            qty = {
                cantidad: ""
            };

        if ($btnComprarProduto.length) {

            var $recebeQtyForm = $('.product__sku-container');

            if ($recebeQtyForm.length) {

                $recebeQtyForm.prepend($templateQty);

            }

        }

    }
};

/* 

[b8.Static]

============================= */

var static = {
    init: function () {
        if ($static.length) {
            static.sideBarUpdate();
            static.anchoring();
            static.asideSticky('.static__sideBarNavigation-container');
            console.log("static.init()  ˙ω˙");
        }
    },
    sideBarUpdate: function () {
        var $content = $(".footer__col-1").find('a'),
            $container = $(".static__sideBarNavigation-content");

        $content.clone().appendTo($container);
        BarbaWidget.addClassNoBarba();
    },
    // anchoring: function () {
    //     var $root = $('html, body'),
    //         $trigger = $('.static__options-anchorLinks-content a');

    //     $($trigger).on("click", function (e) {
    //         e.preventDefault();
    //         $root.animate({
    //             scrollTop: ($($.attr(this, 'href')).offset(100).top + 100)
    //         }, 500);
    //         return false;
    //     });
    // },
    anchoring: function(){
        // Select all links with hashes
        $('.static__options-anchorLinks-content a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('.static__options-anchorLinks-content [href="#"]')
        .not('.static__options-anchorLinks-content [href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: (target.offset().top + 100)
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    },
    asideSticky: function (trigger) {

        var files = ["/arquivos/hc-sticky.min.js"];

        $.when.apply($, $.map(files, function (file) {
                return $.getScript(files);
            }))
            .then(function () {

                $(trigger).hcSticky({
                    top: 80,
                    bottomEnd: 0,
                    responsive: true
                });

            }, function err(jqxhr, textStatus, errorThrown) {
                // handle error
            });

    }
};

/* 

[b9.Barba]

============================= */

var BarbaWidget = {
    init: function () {
        var scope = this;

        if ($static.length) {
            BarbaWidget.Static.init();
            Barba.Pjax.start();
            Barba.Prefetch.init();
            Barba.Pjax.getTransition = function () {
                return scope.fadeTransition;
            };
            console.log("BarbaWidget.init()  ˙ω˙");
        }
    },
    addClassNoBarba: function () {
        var $allHref = $('a'),
            $targetBarba = $(".static__sideBarNavigation-content").find('a');

        $allHref.addClass('no-barba');
        setTimeout(function () {
            $targetBarba.removeClass('no-barba');
        }, 300);

    },
    Static: Barba.BaseView.extend({
        namespace: 'static',
        onEnter: function () {
            console.log("barba view init");
            setTimeout(function () {
                confiGenerales.init();
                static.init();
            }, 800);
            //confiGenerales.init();
            //static.init();
        },
        onEnterCompleted: function () {
            // The Transition has just finished.
            var $root = $('html, body');
            $root.animate({
                scrollTop: (0)
            }, 500);
        },
        onLeave: function () {
            // A new Transition toward a new page has just started.
        },
        onLeaveCompleted: function () {
            // The Container has just been removed from the DOM.
        }
    }),
    fadeTransition: Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },
        fadeOut: function () {
            return $(this.oldContainer).animate({
                opacity: 0
            }).promise();
        },
        fadeIn: function () {
            var _this = this,
                $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });

            $el.animate({
                opacity: 1
            }, 400, function () {
                _this.done();
            });
        }
    })
};