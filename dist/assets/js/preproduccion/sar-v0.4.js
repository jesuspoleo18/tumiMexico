/*----------------------------inicio--------------------------------

[Script - principal ]

Projecto:  SamsoniteBR  - 2018
Version:  0.1
Ultimo cambio: 22/01/18.
Asignado a:  jesus poleo.
Primary use:  Ecommerce. 

----------------------

[Tabla de contenido]

1.Inicializacion de controles.
2.Controles generales.
3.Controles de home.
4.Controles de producto.
5.Controles de depto y categ.
6.Controles de cuenta.


** Recomendaciones para navegacion de tabla de contenido **

[Shortcuts]

1.Ctrl+inicio (regresas a la linea 1 del archivo).
2.Ctrl+fin    (te lleva a la ultima linea del archivo).

-------------------------fin---------------------------------*/


$(function () { init(); });


// 1.Inicializacion de controles.

function init() {

    $(document).foundation();
    confiGenerales.init();
    home.init();
    producto.init();
    categDepto.init();
    account.init();
    console.log("se han iniciado los controles.");

}

// 2.Configuraciones generales

var confiGenerales = {

    init: function () {

        confiGenerales.cuenta('.usuario', '.main-overlay', '.navigation-container__cart');
        confiGenerales.accordion('.toggle-trigger', '.toggle-container');
        $(window).on("resize", function () {
            confiGenerales.accordion('.toggle-trigger', '.toggle-container');
        });
        confiGenerales.backTop();
        confiGenerales.stickyNav('header, .navigation-container');
        confiGenerales.dropCarrito('.middle-container__content-cart', '.main-overlay', '.usuario');
        confiGenerales.megaMenu('.main-overlay, header,.no-megamenu');
        confiGenerales.loader(1500);
        confiGenerales.elementosFormato();
        confiGenerales.compraAsyncVitrina();
        confiGenerales.checkEmptyCart();
        confiGenerales.quickViewAsyncBuy();
        confiGenerales.wishlistOnclick();
        confiGenerales.getSAC('.sac-container', 400);
        confiGenerales.wishlistCheckOptions();
        confiGenerales.masterData();
        confiGenerales.fraseBusqueda();
        confiGenerales.cuotas();
        confiGenerales.newsletterCheckbox();
        confiGenerales.lightcase();
        confiGenerales.internetExplorer();
        confiGenerales.resultadoBusqueda();
        confiGenerales.replaceHref();
        setInterval(confiGenerales.traducciones, 800);
        confiGenerales.mainLazyLoad();

        $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
            // console.log("actualizó");
            confiGenerales.checkEmptyCart();
        });
        console.log("controles generales");

    },

    mainLazyLoad: function () {

        var files = ["https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/8.2.0/lazyload.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        }))
            .then(function () {

                var $home = (".home"),
                    $categDepto = $(".categoria, .departamento, .home, .producto, .resultado-busca, .brand"),
                    $productoContainer = $(".producto-prateleira"),
                    $producto = $(".producto");

                $productoContainer.each(function () {

                    var $thisImg = $(this).find(".producto-prateleira__imagen--url .imagen div"),
                        $thisDiv = $(this).find(".producto-prateleira__imagen--url .imagen"),
                        $thisParent = $(this).find(".producto-prateleira__imagen--url .imagen [data-was-processed='true']");

                    if ($thisImg.length) {

                        if ($thisParent.length) { $thisParent.parent().addClass("load"); }
                        // console.log("Texting");
                    } else {
                        $thisDiv.append("<div></div>");
                        if ($thisParent.length) { $thisParent.parent().addClass("load"); }
                    }

                });

                // if($home.length || $categDepto.length || $producto.length ){

                var home = new LazyLoad({

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

    traducciones: function () {

        var $wishlist = $(".wishlist");

        if ($wishlist.length) {

            var $crearLista = $("[href='/giftlist/create/']:contains('Crear una nueva Lista')"),
                $administrarListas = $("[href='/giftlist/manage/']:contains('Administrar Listas')"),
                $volverAtras = $("[href='javascript:history.back()']:contains('Volver atrás')");

            $crearLista.text('Criar uma lista');
            $volverAtras.text('Voltar');
            $administrarListas.text('gerenciar listas');
        }

    },

    imprimirLista: function () {

        var $wishlist = $(".wishlist");

        if ($wishlist.length) {

            var objeto = document.getElementById('giftlistproduct'),
                ventana = window.open('', '_blank');

            ventana.document.write(objeto.innerHTML);
            ventana.document.close();
            ventana.print();
            ventana.close();

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

            } if (coleccion.includes('busca?fq')) {
                $coleccionParent.html("Os resultados da <strong>coleção</strong> são:");
            }

            $resultText.html(decodeURIComponent(urlText));

        }

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

        var $ajaxStopElems = '.skuListPrice,.oldPrice, .skuBestInstallmentValue, em.total-cart-em, td.monetary, span.best-price.new-product-price, td.quantity-price.hidden-phone.hidden-tablet,span.payment-value-monetary,span.payment-installments, .producto-prateleira__info--bestPrice div, .producto-prateleira__info--oldPrice div';

        // if($porcentaje.length){
        //     $porcentaje.each(function(){
        //         var valor = $(this).text();
        //         if (valor == 0){$(this).remove();} else{$(this).text(valor.split(',')[0] + '%');}
        //     });
        // }else{console.log("porcentaje desactivado");}
        // confiGenerales.FormatoDecimales($ajaxStopElems);

        porcentaje();

        $(document).ajaxStop(function () {
            // confiGenerales.FormatoDecimales($ajaxStopElems);
            porcentaje();
        });

        function porcentaje() {

            var $porcentaje = $(".porcentaje-content");

            $porcentaje.each(function () {

                var valor = parseInt($(this).text());

                if (valor == 0) {
                    $(this).remove();
                }
                else {
                    $(this).text(valor.toFixed() + '%');

                }

            });
        }

    },

    compraAsyncVitrina: function () {

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

    quickViewAsyncBuy: function () {

        var $iframeContentTop = $('#TB_iframeContent', top.document);

        $iframeContentTop.on("load", function () {

            var $iframeBuySuccess = $(".TB_compraExitosa"),
                $thisBtn = $(".buy-button.buy-button-ref"),
                $descripcion = $(".quickview-container__informacion--basica-content .descripcion-larga"),
                $ean = $(".quickview-container__informacion--basica-content .ean"),
                producto = { id: "", descripcion: "", ean: "", caracteristica: "", stock: "", marca: "" },
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
                    url: "https://samsonitear.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + producto.id + "",
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
                            window.parent.confiGenerales.refreshMiniCart();
                            // $iframeBuySuccess.show();
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

        var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        }))
            .then(function () {
                swal({
                    title: 'Producto Agregado',
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#003a7c',
                    cancelButtonColor: '#bbb',
                    cancelButtonText: 'Seguir Comprando',
                    confirmButtonText: 'Ir a Comprar'
                }).then(function () {
                    window.location.href = '/checkout/';
                });
            }, function err(jqxhr, textStatus, errorThrown) {
                console.log(textStatus);
            });

    },

    wishlistOnclick: function () {

        var loginCheck = { login: "" },
            // $img = $(".producto-prateleira__info--wishlist img"),
            $mainContent = $(".producto-prateleira__imagen");

        vtexjs.checkout.getOrderForm().done(function (orderForm) {

            loginCheck.login = orderForm.loggedIn;

            console.log("cliente logeado:" + " " + orderForm.loggedIn);

            if (loginCheck.login == true) {

                var $a = $(".login-wishlist"),
                    $checkActive = $(".producto-prateleira__info--wishlist .product-insertsku");

                $a.remove();
                $checkActive.addClass('active');

                console.log("estás registrado");

                // $img.addClass('active');

                $mainContent.each(function () {

                    var $btnWishlist = $(this).find(".insert-sku-checkbox");

                    $btnWishlist.on("change", function () {

                        if ($(this).is(":checked")) {
                            $(".glis-popup-link").click();
                        } else {
                            console.log("no estoy capturando el evento");
                        }

                    });

                });

            } else if (loginCheck.login == false) {

                console.log("no estás registrado");

                $mainContent.each(function () {

                    var $el = $(".producto-prateleira__info--wishlist"),
                        $noLoginTemplate = '<div class="login-wishlist"> <a class="login-wishlist__trigger"></a> </div>',
                        $loginBtn = $(".ajax-content-loader").find(".glis-link.must-login").attr('href'),
                        $btn = $(".login-wishlist__trigger"),
                        $find = $(this).find($el);

                    // console.log($wishBtn);

                    $find.html($noLoginTemplate);

                    $btn.on("click", function () {

                        console.log($loginBtn);
                        window.location.href = "/login?ReturnUrl=%2f";

                    });

                });

            }

        });

    },

    wishlistCheckOptions: function () {

        var $listname = $("#giftlistname"),
            $listurl = $("#giftlisturl"),
            $alwaysChecked = $("#giftlistaccept,#giftlistispublic-no");

        $listname.on("keyup", function () {
            var $value = $(this).val();
            $listurl.val($value);
        });

        $alwaysChecked.attr("checked", "checked");

    },

    cuenta: function (el, exit, secondExit) {

        var $responsive = $(window).width();

        if ($responsive > 768) {

            $(el).on("hover", function () {

                $(".usuario__dropdown-menu").addClass("overlay-dropdown", 500);

                $(exit).addClass("displayAccount", 500);

            });

            $("header").on("hover", exit, secondExit, function () {

                $(".usuario__dropdown-menu").removeClass("overlay-dropdown", 500);

                $(exit).removeClass("displayAccount", 500);

            });

            $(".top-bar__content").on("mouseleave", function () {

                $(".usuario__dropdown-menu").removeClass("overlay-dropdown", 500);

                $(exit).removeClass("displayAccount", 500);

            });

            $(".usuario").prevAll().on("hover", function () {

                $(".usuario__dropdown-menu").removeClass("overlay-dropdown", 500);

                $(exit).removeClass("displayAccount", 500);

            });

        }

    },

    dropCarrito: function (el, exit, secondExit) {

        var $responsive = $(window).width();

        if ($responsive > 768) {

            $(el).on("hover", function () {

                $(".middle-container__content-popCart").addClass("display", 500);

                $(exit).addClass("display", 500);

            });

            $("header").on("hover", exit, secondExit, function () {

                $(".middle-container__content-popCart").removeClass("display", 500);

                $(exit).removeClass("display", 500);

            });

            $(".middle-container__content-cart").prevAll().on("hover", function () {

                $(".middle-container__content-popCart").removeClass("display", 500);

                $(exit).removeClass("display", 500);

            });

            $(".middle-container").on("mouseleave", function () {

                $(".middle-container__content-popCart").removeClass("display", 500);

                $(exit).removeClass("display", 500);

            });

        }

    },

    checkEmptyCart: function () {

        var $emptyBag = $(".middle-container__content-popCart .emptyBag"),
            $NoEmptyBag = $(".middle-container__content-popCart .emptyBag.active"),
            $cartNumber = $(".middle-container__content-cart"),
            $cartFooter = $(".middle-container__content-popCart .cartFooter"),
            $monto = $(".middle-container__content-popCart .vtexsc-text").text().replace('$', ''),
            $montoValor = parseFloat($monto);

        // console.log($montoValor);

        if ($montoValor == 0) {

            // console.log("miniCart vacío");
            confiGenerales.mainLazyLoad();

            $emptyBag.addClass("active");
            $cartNumber.removeClass("active");
            $cartFooter.removeClass("clearfix");

        } if ($montoValor > 0) {

            confiGenerales.mainLazyLoad();

            // console.log("miniCart tiene productos");

            $NoEmptyBag.removeClass("active");
            $cartNumber.addClass("active");
            $cartFooter.removeClass("clearfix");
        }

    },

    backTop: function () {

        var offset = 300,
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
            }, scroll_top_duration
            );
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

    stickyNav: function (el) {

        var files = ["https://cdnjs.cloudflare.com/ajax/libs/headroom/0.9.4/headroom.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files);
        })).then(function () {

            var myElement = document.getElementById('headRoomAllNav'),
                headroom = new Headroom(myElement);
            headroom.init(); 

        }, function err(jqxhr, textStatus, errorThrown) {
            console.log(textStatus);
        });
    },

    megaMenu: function (exit) {

        var $responsive = $(window).width();

        if ($responsive > 768) {

            var $navigationMenuItem = $('.navigation__menu-content a'),
                $megamenu = $(".navigation__megamenu-content");

            $navigationMenuItem.each(function () {
                $(this).on("mouseenter", function () {
                    var $menuItemAttr = $(this).attr("class");

                    confiGenerales.mainLazyLoad();
                    confiGenerales.menuItems($(this), exit, ".main-overlay");

                    $megamenu.each(function () {
                        var $megamenuAttr = $(this).attr("id");
                        if ($menuItemAttr == $megamenuAttr) {
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

    menuItems: function (ele, exit, overlay) {
        ele.addClass("active");
        $(overlay).addClass("display");
        ele.siblings().removeClass("active");

        $(exit).on("hover", function () {
            ele.removeClass("active");
            $(overlay).removeClass("display");
            $(exit).removeClass("active");
        });
    },

    accordion: function (trigger, content) {

        var $responsive = $(window).width();

        if ($responsive < 768) {

            console.log("accordion");

            $(content).hide();

            $(trigger).click(function () {
                $(this).toggleClass("active").nextAll().slideToggle("slow");
                return false;
            });
        } else { $(content).show(); }

    },

    loader: function (time) {

        var $home = $(".home"),
            $loader = $(".main-loader__container");

        setTimeout(function () {

            $($loader).fadeOut("slow");

        }, time);

    },

    getSAC: function (el, height) {

        var $el = $('.sac-container');

        $(document).scroll(function () {

            var $a = $(this).scrollTop();

            if ($a > height) {

                $(el).fadeIn();

            } else {

                $(el).fadeOut();

            }

        });

        $el.on("click", function () {

            $(this).remove();

            var files = ["/files/smx-zendesk.js"];

            $.when.apply($, $.map(files, function (file) {
                return $.getScript(files);
            }))
                .then(function () {

                    setTimeout(function () {
                        $('.zopim iframe').contents().find('.border_overlay').click();
                    }, 800);

                }, function err(jqxhr, textStatus, errorThrown) {
                    // handle error
                });
        });

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
                url: '//api.vtexcrm.com.br/samsonitear/dataentities/SN/documents',

                success: function (data) {

                    // $('#NewsAprob').foundation('reveal', 'open');
                    var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                    $.when.apply($, $.map(files, function (file) {
                        return $.getScript(files);
                    }))
                    .then(function () {
                        swal({
                            title: 'Su información ha sido envíada con éxito.',
                            type: 'success',
                            // showCancelButton: true,
                            confirmButtonColor: '#003a7c',
                            // cancelButtonColor: '#bbb',
                            // cancelButtonText: 'OK',
                            confirmButtonText: 'OK'
                        });
                    }, function err(jqxhr, textStatus, errorThrown) {
                        console.log(textStatus);
                    });
                    clearData();

                },
                error: function (data) {

                    // $('#NewsError').foundation('reveal', 'open');
                    var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                    $.when.apply($, $.map(files, function (file) {
                        return $.getScript(files);
                    }))
                        .then(function () {
                            swal({
                                title: 'Verifique que la información ingresada es la correcta.',
                                type: 'error',
                                // showCancelButton: true,
                                confirmButtonColor: '#E4002B',
                                // cancelButtonColor: '#bbb',
                                // cancelButtonText: 'OK',
                                confirmButtonText: 'OK'
                            });
                        }, function err(jqxhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        });
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
                url: '//api.vtexcrm.com.br/samsonitear/dataentities/SC/documents',

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

    cuotas: function () {

        var $producto = $("body.producto"),
            $categDeptoBusca = $(".categoria, .departamento, .busca");

        if ($producto.length) {

            var $text = $(".price-best-price"),
                $priceAhora = $(".basica-precio .valor-por.price-best-price:contains('Ahora:')");
            // number = (parseFloat(text.replace("$",""))/6).toFixed(3);

            $priceAhora.each(function () {
                $(this).html($(this).html().split("Ahora:").join(""));
            });

            $text.each(function () {

                var $texto = $(this).text(),
                    number = (parseFloat($texto.replace("$", "")) / 6).toFixed(3);

                $(".basica-precio .cuotas").html('$' + number);
            });

            $(".carousel-interesar .producto-prateleira__info--precio").each(function () {

                var $controlBestPrice = $(this).find(".bestPrice:visible"),
                    $controlCuotas = $(this).find(".cuotas"),
                    priceCuota = (parseFloat($controlBestPrice.text().trim().replace("$", "")) / 6).toFixed(3);

                $controlCuotas.text("$" + priceCuota);
            });

        }

        if ($categDeptoBusca.length) {

            $(".producto-prateleira__info--precio").each(function () {

                var $controlBestPrice = $(this).find(".producto-prateleira__info--bestPrice.promo-price div:visible"),
                    $controlCuotas = $(this).find(".cuotas"),
                    priceCuota = (parseFloat($controlBestPrice.text().trim().replace("$", "")) / 6).toFixed(3);

                $controlCuotas.text("$" + priceCuota);
            });

        }

    },

    newsletterCheckbox: function () {

        var $femenino = $("#sn_femenino"),
            $masculino = $("#sn_masculino");

        $femenino.on("change", function () {

            $(this).addClass('visto-femenino');
            $('.newsletter__masculino #sn_masculino').removeClass('visto-masculino');

        });

        $masculino.on("change", function () {

            $(this).addClass('visto-masculino');
            $('.newsletter__femenino #sn_femenino').removeClass('visto-femenino');

        });

    },

    lightcase: function () {

        $('a[data-rel^=lightcase]').lightcase();

    },

    replaceHref: function () {

        var $accept = $(".categoria, .departamento, .home, .producto, .resultado-busca, .brand");

        if ($accept.length) {

            var $a = $('.thickbox');

            $a.each(function (key, val) {
                $(val).attr('href', $(val).attr('href').replace("http://", "https://"));
            });
        }

    },

    internetExplorer: function () {

        if (window.ActiveXObject || "ActiveXObject" in window) {
            // $("#explorerOnce").foundation("reveal", "open");
            // $("#explorerOnce .close-reveal-modal").on("click", function(){
            //     $("#explorerOnce").foundation("reveal", "close");
            // });
            alert("www.samsonitear, está optimizado para versiones superiores a IE11, es posible que no pueda disfrutar de todas las funcionalidades que ofrecemos con esta versión de su navegador.")
        }

    }

};

// 3.Controles de home.
var home = {

    init: function () {

        home.carousel('.home-slide', '.carousel-populares,.carousel-novedades', '.carousel-agregadoExito');
        console.log("controles del home");

    },

    carousel: function (uno, dos, tres) {

        var $home = $(".home");

        if ($home.length) {

            $(".helperComplement").remove();

            $("#mas-populares .prateleira").children().addClass("carousel-populares");
            $("#novedades .prateleira").children().addClass("carousel-novedades");
            // $(".descubre-container .prateleira").children().addClass("carousel-descubre");
            // $(".temporada-imagen-content__carousel .prateleira").children().next().addClass("carousel-temporada");
            // $(".te-recomendamos-container .prateleira").children().addClass("carousel-recomendado");
            $(".agregadoExito-productos .prateleira").children().addClass("carousel-agregadoExito");

            $(uno).slick({

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
                lazyLoad: 'ondemand',
                responsive: [
                    {
                        breakpoint: 650,
                        settings: {
                            autoplay: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: false,
                            arrows: true
                        }
                    }
                ]

            });

            $(dos).on("init", function () {

                $(this).addClass('active');

            });

            setTimeout(function () {

                $(dos).slick({

                    autoplay: false,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 4,
                    slidesToShow: 4,
                    speed: 1000,
                    lazyLoad: 'ondemand',
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

            }, 1000);

            $(window).on('open.fndtn.reveal', function () {

                $(tres).on("init", function () {

                    $(this).addClass('active');

                });

                setTimeout(function () {

                    $(tres).slick({

                        autoplay: true,
                        autoplaySpeed: 2500,
                        slide: 'li',
                        slidesToScroll: 1,
                        slidesToShow: 3,
                        speed: 500,
                        lazyLoad: 'ondemand',
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
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]

                    });

                }, 1000);

            });

            $(window).on('close.fndtn.reveal', function () {

                $(tres).on("destroy", function () {

                    $(this).removeClass('active');

                });

                $(tres).slick('unslick');

            });

            $('.home-slide, .carousel-populares,.carousel-novedades, .carousel-agregadoExito').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                confiGenerales.mainLazyLoad();
                // console.log(nextSlide);
            });

        } else {

            $(".helperComplement").remove();

            $(".agregadoExito-productos .prateleira").children().addClass("carousel-agregadoExito");

            $(tres).on("init", function () {

                $(this).addClass('active');

            });

            $(window).on('open.fndtn.reveal', function () {

                setTimeout(function () {

                    $(tres).slick({

                        autoplay: true,
                        autoplaySpeed: 2500,
                        slide: 'li',
                        slidesToScroll: 1,
                        slidesToShow: 3,
                        speed: 500,
                        lazyLoad: 'ondemand',
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
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]

                    });

                }, 1000);

            });

            $(window).on('close.fndtn.reveal', function () {

                $(tres).on("destroy", function () {

                    $(this).removeClass('active');

                });

                $(tres).slick('unslick');

            });

        }

    }

};

// 4.Controles de producto.
var producto = {

    init: function () {

        var $producto = $("body.produto");

        if ($producto.length) {

            producto.qtdControl();
            producto.textoProducto();
            producto.carousel('.carousel-interesar');
            //producto.accordion('.descripcion-title','.descripcion-content');
            producto.compraFichaProducto();
            producto.productoSticky();
            producto.miniatura();
            producto.infoProducto();
            producto.anchorDescripcion();
            producto.tallasColores();
            producto.formatoPrecioFichaProductoReplace(".skuBestPrice");
            confiGenerales.mainLazyLoad();
            // setInterval(producto.traducciones, 500);
            console.log("controles de producto");
        }

        // producto.elementosFormato();

    },

    traducciones: function () {

        var $wishlistBtn = $(".glis-link.must-login:contains('Faça login pra adicionar produtos à lista')");

        $wishlistBtn.text('Ingrese para agregar a sus favoritos');

    },

    formatoPrecioFichaProducto: function (seletor) {

        $(seletor).each(function () {

            var novoConteudoPreco = $(this).text();

            if (novoConteudoPreco.indexOf(',') > -1) {

                var padrao = /([$\s\d.]*)([,\d]+)/gm;

                novoConteudoPreco = novoConteudoPreco.replace(padrao, '$1').replace(',', '');

                $(this).html(novoConteudoPreco);

            }

        });

    },

    formatoPrecioFichaProductoReplace: function (seletor) {

        $(seletor).each(function () {

            var novoConteudoPreco = $(this).text();

            if (novoConteudoPreco.indexOf(',') > -1) {

                var padrao = /([$\s\d.]*)([,\d]+)/gm;

                novoConteudoPreco = novoConteudoPreco.replace(".", "-").replace(",", ".").replace("-", ",");

                $(this).html(novoConteudoPreco);

            }

        });

    },

    elementosFormato: function () {

        var $ajaxStopElems = '.skuBestPrice, .price-best-price, span.vtexsc-text, .bestPrice, .orders .db.mt0.mb2.f6.fw6 span,.orders .db.w-100.f6.fw5.mid-gray.tr.tl-l.f5-l span';

        producto.formatoPrecioFichaProducto($ajaxStopElems);

        $(document).ajaxStop(function () {
            producto.formatoPrecioFichaProducto($ajaxStopElems);
        });

    },

    anchorDescripcion: function () {

        var $root = $('html, body'),
            $trigger = $('.descripcion-anchor'),
            $responsive = $(window).width();

        if ($responsive < 768) {

            $($trigger).on("click", function () {
                $root.animate({
                    scrollTop: (700)
                }, 500);
                return false;
            });

        } else {

            $($trigger).on("click", function () {
                $root.animate({
                    scrollTop: (500)
                }, 500);
                return false;
            });

        }

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
            //         $this.attr('href', url.replace('qty=1', 'qty='+ parseInt( $('.compra-qtd-btn .box-qtd .qtd').val() ) ) );
            //     }
            // });

            var $recebeQtyForm = $btnComprarProduto.parents('.compra-qtd-btn');

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

                $(document).on('keypress', '.compra-qtd-btn .box-qtd .qtd', function (e) {

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

                $(document).on('keyup', '.compra-qtd-btn .box-qtd .qtd', function (e) {

                    $('.compra-qtd-btn .box-qtd .qtd').val($(this).val());
                });

                $(document).on('blur', '.compra-qtd-btn .box-qtd .qtd', function (e) {

                    var $this = $(this);

                    if ($this.val() === '' || parseInt($this.val()) < 1) {
                        $('.compra-qtd-btn .box-qtd .qtd').val(1);
                    } else {
                        $('.compra-qtd-btn .box-qtd .qtd').val($this.val());
                    }

                });

                $(document).on('click', '.compra-qtd-btn .box-qtd .btn', function () {

                    var $this = $(this),
                        $qtd = $('.compra-qtd-btn .box-qtd .qtd'),
                        valor = parseInt($qtd.val());

                    if ($this.hasClass('btn-mais')) {

                        $qtd.val(valor + 1);

                        if (parseInt($('.compra-qtd-btn .box-qtd .qtd').val()) === qty.cantidad) {
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
            $ean = $(".ean"),
            $descripcion = $(".descripcion-content .productDescription"),
            $caracteristica = $(".descripcion-content .caracteristicas"),
            $productoName = $(".notifyme-client-name"),
            $productoEmail = $(".notifyme-client-email");

        // $productoName.attr("placeholder", "NOMBRE");
        // $productoEmail.attr("placeholder", "EMAIL");

        vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

            var $dispMark = $(".compra-stock-content .texto"),
                $disp = $(".compra-stock-content .disponibilidad");

            producto.stock = product.available;
            producto.cantidad = product.skus[0].availablequantity;

            if (JSON.stringify(producto.stock) === 'false') {

                var $erase = $(".pull-left.box-qtd, .despacho, .producto-sticky-container--compra .buy-button.buy-button-ref, .producto-sticky-container--compra .portal-notify-me-ref, .basica-precio .cuotas-container, .compra-stock"),
                    $toAppend = $(".producto-sticky-container--compra .compra-qtd-btn"),
                    $noDisponible = '<h2 class="no-disponible">Produto não disponível</h2>';

                $erase.remove();
                $toAppend.append($noDisponible);

            } else { console.log("available"); }

            if (producto.cantidad > 0) {

                $disp.append(producto.cantidad);
                $dispMark.addClass("green");

                if (parseInt($('.disponibilidad').text()) === 1) {

                    $(".btn-mais").prop('disabled', true);

                } else {
                    $(".btn-mais").removeAttr('disabled');
                }

            } else {

                $disp.append(producto.cantidad);
                $dispMark.addClass("red");

            }

            producto.id = product.productId;
            console.log(product);
        });

        $.ajax({
            url: "https://samsonitear.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + producto.id + "",
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (data) {
                console.log(data);
                producto.descripcion = data[0]['Descripción Larga'];
                producto.ean = data[0].items[0].ean;
                producto.marca = data[0].brand;
                // producto.caracteristica = data[0].Características[0];
                var $template = '<div class="basica-marca">' + producto.marca + '</div>',
                    $responsive = $(window).width();

                $descripcion.append(producto.descripcion);
                $ean.append(producto.ean);

                if ($responsive < 768) {

                    $($template).insertBefore(".basica-nombre");

                } else { $($template).insertAfter(".basica-nombre"); }

                // $caracteristica.append(producto.caracteristica);
                dotInfo();
                marcaProducto();
            }
        });

        function dotInfo() {

            var $texto = $(".caracteristicas-content .productDescription").text(),
                $container = $(".caracteristicas-content .productDescription"),
                $result = $texto.replace(/\*/g, '<p class="space"></p><span class="dot">• </span>');

            $container.html($result);
        }

        function marcaProducto() {

            var $locationMobile = $(".producto-container-mobile .basica-marca"),
                $location = $(".producto-container__informacion--basica-content");

            if (producto.marca == 'American Tourister') {

                var $templateaT = '<div class="logo-marca"><img src=/arquivos/logo-AT.png></div>';

                $location.prepend($templateaT);
                $locationMobile.html($templateaT);

            } else if (producto.marca == 'Samsonite Black Label') {

                var $templatesmxBlack = '<div class="logo-marca"><img src=/arquivos/logo-smxNegro-3.png></div>';

                $location.prepend($templatesmxBlack);
                $locationMobile.html($templatesmxBlack);

            } else if (producto.marca == 'Samsonite') {

                var $templatesmx = '<div class="logo-marca"><img src=/arquivos/logo-smxAzul-3.png></div>';

                $location.prepend($templatesmx);
                $locationMobile.html($templatesmx);

            } else if (producto.marca == 'Xtrem') {

                var $templatesmx = '<div class="logo-marca"><img src=/arquivos/logo-xtrem.png></div>';

                $location.prepend($templatesmx);
                $locationMobile.html($templatesmx);
            }

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

    accordion: function (trigger, content) {

        var $descripcionLarga = $(".descripcion-larga");

        $(content).hide();

        $(trigger).on("click", function () {
            $(this).toggleClass("active").next().slideToggle("slow");
            return false;
        });

        $descripcionLarga.on("click", function () {
            $(trigger).eq(0).toggleClass("active").next().slideToggle("slow");
            return false;
        });

    },

    compraFichaProducto: function () {

        var $btnFichaProducto = $(".buy-button.buy-button-ref");

        $btnFichaProducto.unbind('click');

        $btnFichaProducto.bind('click', function () {

            var url = $(this).attr('href').split("?")[1],
                param = url.split("&"),
                $url = $(this).attr('href'),
                // qtyBox = $(this).attr('href', $url.replace('qty=1', 'qty='+ parseInt( $('.compra-qtd-btn .box-qtd .qtd').val() ) ) ),
                qtyBox = parseInt($('.compra-qtd-btn .box-qtd .qtd').val()),
                item = {
                    id: param[0].split("=")[1],
                    quantity: qtyBox,
                    // quantity: param[1].split("=")[1], 
                    seller: param[2].split("=")[1]
                };

            vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {

                $('#agregadoExito').foundation('reveal', 'open');
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

            var $el = $(".producto-container__imagen .thumbs li"),
                $element = $(".producto-container__imagen .thumbs li:eq(0)"),
                $otherImgs = $(".producto-container__imagen .thumbs li");

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

            var $el = $(".producto-container__imagen .thumbs li"),
                $init = $(".producto-container__imagen .thumbs"),
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

    infoProducto: function () {

        var $btnCarac = $(".caracteristicas-tab"),
            $caracActive = $(".caracteristicas-tab, .descripcionCaracteristicas-content"),
            $btnDescripcion = $(".descripcion-tab"),
            $descripcionActive = $(".descripcion-tab ,.descripcion-content");

        $descripcionActive.addClass('active');

        $btnCarac.on("click", function () {
            $caracActive.addClass('active');
            $descripcionActive.removeClass('active');
        });

        $btnDescripcion.on("click", function () {
            $descripcionActive.addClass('active');
            $caracActive.removeClass('active');
        });

    },

    tallasColores: function () {

        colorActive();
        tallaActive();
        checkEmptyDiv();

        function checkEmptyDiv() {

            var $empty = $(".basica-tallasColores--colores:empty, .basica-tallasColores--tallas:empty"),
                $parent = $(".basica-tallasColores");

            if ($empty.length) {
                $parent.hide();
            }

        }

        function colorActive() {

            var $el = $(".basica-tallasColores--colores .prateleira-tallasColores ul li");

            $el.each(function () {

                var hrefProducto = window.location,
                    decode = decodeURIComponent(hrefProducto),
                    $a = $(this).find(".tallasColores-uri"),
                    str = $a.text();

                console.log(decode);
                console.log(str);

                if (decode == str) {
                    //console.log("los nombres hacen match");
                    $(this).addClass('active');
                } else {
                    //console.log("los nombres NO hacen match");
                }

            });

        }

        function tallaActive() {

            var $el = $(".basica-tallasColores--tallas .prateleira-tallasColores ul li");

            $el.each(function () {

                var hrefProducto = window.location,
                    decode = decodeURIComponent(hrefProducto),
                    $a = $(this).find(".tallasColores-uri"),
                    b = $a.text(),
                    x = $(this).find(".producto-prateleira__imagen--url"),
                    str = x.attr("title").toLowerCase().replace(/\s+/g, '-').split("-").pop(),
                    tallas = [

                        // {"talla": "s", "valores": ['-55-20-','-20-','-21-','-19-','-55-'] },

                        // {"talla": "m", "valores": ['-68-','-71-27-','-71-27-','-75-28-','-65-24-','-66-24-','-67-24-','-68-25-','-69-25-','-24-','-25-'] },

                        // {"talla": "l", "valores": ['-28-','-29-','-76-','-79-','-82-','-72-26-','-75-28-','-77-28-','-78-28-','-78-29-','-79-29-','-80-30-','-86-33-','-81-30-',
                        // '-81-32-','-82-31-']}

                        { "talla": "xs", "valores": ['xs'] },

                        { "talla": "p", "valores": ['p'] },

                        { "talla": "s", "valores": ['s'] },

                        { "talla": "m", "valores": ['m'] },

                        { "talla": "l", "valores": ['l'] },

                        { "talla": "g", "valores": ['g'] },

                        { "talla": "xl", "valores": ['xl'] }
                    ];

                console.log(str);

                if (decode == b) {
                    // console.log("los nombres hacen match");
                    $(this).addClass('active');
                } else {
                    // console.log("los nombres NO hacen match");
                }

                $.each(tallas, function (i, talla) {

                    console.log(talla);
                    $.each(talla.valores, function (v, valor) {
                        if (str == valor) {

                            if (talla.talla == 'xs') {
                                x.addClass('talla-xs');
                                $(".producto-prateleira__imagen--url.talla-xs").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-xs-order");
                            }
                            if (talla.talla == 'p') {
                                x.addClass('talla-p');
                                $(".producto-prateleira__imagen--url.talla-p").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-p-order");
                            }
                            if (talla.talla == 's') {
                                x.addClass('talla-s');
                                $(".producto-prateleira__imagen--url.talla-s").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-s-order");
                            }
                            if (talla.talla == 'm') {
                                x.addClass('talla-m');
                                $(".producto-prateleira__imagen--url.talla-m").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-m-order");
                            }
                            if (talla.talla == 'l') {
                                x.addClass('talla-l');
                                $(".producto-prateleira__imagen--url.talla-l").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-l-order");
                            }
                            if (talla.talla == 'g') {
                                x.addClass('talla-g');
                                $(".producto-prateleira__imagen--url.talla-g").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-g-order");
                            }
                            if (talla.talla == 'xl') {
                                x.addClass('talla-xl');
                                $(".producto-prateleira__imagen--url.talla-xl").parent(".producto-prateleira__imagen").parent('.producto-prateleira').parent().addClass("talla-xl-order");
                            }

                            // console.log(talla.talla);
                            // console.log(valor);
                            return false;
                        }
                    });

                });

            });

        }

    }

};

// 5.Controles de depto y categ.
var categDepto = {

    init: function () {

        var $categDepto = $("body.departamento, body.categoria, body.resultado-busca, body.brand"),
            $mix = ("body.departamento, body.categoria, body.resultado-busca, body.estatico.buscavazia, body.resultado-busca.no-encontro.no-encontro-filtros");

        if ($categDepto.length) {

            categDepto.categDeptoAccordion('.search-single-navigator h4,.search-single-navigator h5', '.search-single-navigator h3');
            categDepto.asideSticky('.content__aside .navigation-tabs, .content__aside .navigation');
            categDepto.breadCrumbFilter();
            categDepto.infinityScroll();
            categDepto.toggleClassMochila();
            //setInterval(categDepto.traducciones,800);
            setInterval(confiGenerales.mainLazyLoad, 800);
            categDepto.traducciones();
            categDepto.filtroSticky();
            categDepto.mobilePageChange();
            $('.carousel-interesar, .carousel-agregadoExito').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                confiGenerales.mainLazyLoad();
                // console.log(nextSlide);
            });
            console.log("controles de categDepto");

        }
        if ($mix.length) {
            categDepto.errorUndefined();
        } else { console.log("not mix"); }

    },

    errorUndefined: function () {

        var url = window.location.href;

        if (url.includes("undefined")) {

            $(window).on('open.fndtn.reveal', function () {
                setTimeout(function () {
                    document.location.href = '/';
                }, 800);
            });

            $('#errorUndefined').foundation('reveal', 'open');

        }

        console.log(url);

    },

    filtroSticky: function () {

        var $elShow = $(".categoria-container__content .content__main--filtroBtnMobile .btn"),
            $responsive = $(window).width();

        if ($responsive < 768) {

            $(window).scroll(function () {

                if ($(this).scrollTop() > 1) {

                    $elShow.addClass('sticky', 500);
                    $elShow.removeClass('fixed');

                } else {

                    $elShow.removeClass('sticky', 500);
                    $elShow.removeClass('fixed');

                }

            });

        }

    },

    toggleClassMochila: function () {

        var a = window.location.pathname;

        if (a.indexOf('/mochilas') > -1) {
            $("body").addClass('mochila');
        }

    },

    traducciones: function () {

        var $rangoPrecio = $(".HideFaixa-de-preco:contains('Faixa de preço'), .Faixa-de-preco:contains('Faixa de preço')"),
            $verOpciones = $(".ver-filtros:contains('Veja todas as opções')"),
            $productosEncontrados = $(".resultado-busca-numero .label:contains('Produtos encontrados')");

        // $rangoPrecio.text('Rango de Precios');
        $productosEncontrados.text('Productos encontrados:');
        // $verOpciones.text('Vea todas las opciones');

    },

    mobilePageChange: function () {

        var $responsive = $(window).width();

        if ($responsive < 650) {

            $(window).bind('hashchange', function () {
                console.log("cambio");
                $(".back-to-top").click();
                setTimeout(function () {
                    confiGenerales.wishlistOnclick();
                    confiGenerales.compraAsyncVitrina();
                }, 2000);
            });

        }

    },

    categDeptoAccordion: function (trigger, secondTrigger) {

        var $categDepto = $(".departamento, .categoria, .resultado-busca");

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

                if ($(".content__aside .HideGRUPO-DE-COR.active").length) {

                    console.log("true");
                    $activeColor.css({
                        "display": "flex",
                        "flex-flow": "row wrap",
                        "justify-content": "flex-start"
                    });

                } else { console.log("false"); }
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

            $marca.css({
                "display": "block"
            });

        }

    },

    asideSticky: function (trigger) {

        var files = ["/arquivos/hc-sticky.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files)
        }))
            .then(function () {

                $(trigger).hcSticky({
                    top: 140,
                    bottomEnd: 100,
                    responsive: true
                });

            }, function err(jqxhr, textStatus, errorThrown) {
                // handle error
            });

    },

    breadCrumbFilter: function () {

        var $el = $(".busca-texto-livre-elimina"),
            $class = 'breadcrumb__busca';

        $el.parent().addClass($class);

    },

    infinityScroll: function () {

        var files = ["/arquivos/QD_infinityScroll.min.js"];

        $.when.apply($, $.map(files, function (file) {
            return $.getScript(files)
        }))
            .then(function () {

                console.log("cargo el infinity");

                var $responsive = $(window).width(),
                    $desktop = $(".prateleira[id*=ResultItems]:first");

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
                            confiGenerales.mainLazyLoad();
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

};

// 6.Controles de cuenta

var regiones = [],
    comunas = [],
    country = 'CHL';

var account = {

    init: function () {

        var $account = $("body.account");

        if ($account.length) {

            account.loadRegionComuna();
            account.addresUpdate();
            account.addresDeletePop();
            account.addresDeleteClick();
            account.showContentAccount();
            //setInterval(account.traducciones,2000);

            $('#formAddressNew').submit(function (e) {

                e.preventDefault();
                account.createAddress();

            });
            console.log("controles generales");
        }

    },

    traducciones: function () {

        var $miPerfil = $(".account h4:contains('Meu Perfil')"),
            $telefono = $(".account .profile-detail-display-info .title:contains('Telefone:')"),
            $dataNasc = $(".account .profile-detail-display-info .title:contains('Data de nascimento:')"),
            $alterarDatos = $(".account .edit.edit-profile-link a:contains('Alterar dados')"),
            $apellido = $(".profile-detail-display-nickname .title:contains('Apelido:')"),
            $telefono = $(".profile-detail-display-cellphone .title:contains('Telefone Comercial')");

        $telefono.text('Teléfono:' + ' ');
        $dataNasc.text('Fecha de nacimiento:' + ' ');
        $alterarDatos.text('Alterar datos' + ' ');
        $miPerfil.text('Mi Perfil' + ' ');
        $apellido.text('Apellido:' + ' ');
        $telefono.text('Teléfono Comercial:' + ' ');

    },

    loadRegionComuna: function () {

        $.ajax({

            type: "GET",
            dataType: 'html',
            url: 'https://io.vtex.com.br/front.shipping-data/2.12.6/script/rule/CountryCHL.js',

            success: function (response) {

                var data = response.split("this.map="),
                    json = data[1].split("}}")[0];

                json = json + "}}";
                json = json.split('"').join('');
                json = json.split('{').join('{"');
                json = json.split(':').join('":');
                json = json.split(',').join(',"');

                data = $.parseJSON(json);
                //console.log(data);

                for (region in data) {
                    regiones.push({
                        id: region,
                        nombre: region
                    });
                    for (comuna in data[region]) {
                        comunas.push({
                            id: comuna,
                            id_region: region,
                            nombre: comuna,
                            codigo: (data[region])[comuna]
                        });
                    }
                }

                $.each(regiones, function (index, value) {
                    if (index == 0) {
                        $("#cmbRegion").append(new Option("-- Seleccione una Región --", ""));
                        $("#cmbComuna").append(new Option("-- Seleccione una Comuna --", ""));
                    }
                    $("#cmbRegion").append(new Option(value.nombre, value.id));
                });

                $("#cmbRegion").change(function () {
                    var id = $(this).val();
                    $('#cmbComuna').find('option').remove().end().append(new Option("-- Seleccione una Comuna --", ""));

                    if (id != undefined && id != null && id != "") {
                        $.each(comunas, function (index, value) {
                            if (value.id_region == id)
                                $("#cmbComuna").append(new Option(value.nombre, value.codigo));

                        });

                        $("#cmbComuna").change(function () {
                            if ($(this).val() != "") {
                                // var comuna = comunas.find(c => c.codigo == $(this).val());
                                var comuna = comunas.filter(function (element) { return element.codigo === $(this).val() });
                                $("#spnNombreComuna").text(comuna.nombre);

                            } else {

                            }

                        });
                    }
                });
            }

        });

    },

    createAddress: function () {

        var country = $("meta[name='country']").attr("content"),
            addressName = $('#aliasDireccion').val(),
            receiverName = $('#destinatario').val(),
            addressType = '1',
            postalCode = $('#cmbComuna').val(),
            street = $('#direccion').val(),
            number = $('#numeroDireccion').val(),
            neighborhood = '-',
            city = $('#spnNombreComuna').text(),
            country = $('#country').val(),
            complement = $('#pisoDireccion').val(),
            reference = '-',
            state = $('#cmbRegion').val(),
            userId = $('#userId').val(),
            addressId = $('#addressId').val(),
            dataString =
                'addressName=' + addressName
                + '&receiverName=' + receiverName
                + '&addressType=' + addressType
                + '&postalCode=' + postalCode
                + '&street=' + street
                + '&number=' + number
                + '&complement=' + complement
                + '&reference=' + reference
                + '&neighborhood=' + neighborhood
                + '&city=' + city
                + '&state=' + state
                + '&country=' + country
                + '&userId=' + userId
                + '&addressId=' + addressId;
        //alert (dataString); return false;

        $.ajax({

            type: "POST",
            url: "/no-cache/account/address/save",
            data: dataString,

            success: function (data) {

                // document.getElementById('newsLetter_form').reset();
                $('#addressAprob').foundation('open');

                $(document).click(function () {
                    location.reload();
                });

            },

            error: function (data) {

                $('#addressError').foundation('open');

                $(document).click(function () {
                    location.reload();
                });
            }

        });

    },

    addresUpdate: function () {

        $(".address-update").on("click", function () {

            var addressName = $(this).attr('data-addressname');

            if (addressName == "") {

                $('#aliasDireccion').val("");
                $('#destinatario').val("");
                $('1');
                $('#cmbComuna').val("");
                $('#direccion').val("");
                $('#numeroDireccion').val("");
                $('#pisoDireccion').val("");
                $('-');
                $('-');
                $('span#spnNombreComuna').text();
                $('#cmbRegion').val("");
                $('#addressId').val("");
            }

            else {

                $.ajax({

                    dataType: "json",
                    url: "/no-cache/account/address/detail/" + addressName,

                    success: function (data) {

                        $('#aliasDireccion').val(data['addressName']);
                        $('#destinatario').val(data['receiverName']);
                        $('1');
                        $('#cmbComuna').val(data['city']);
                        $('#direccion').val(data['street']);
                        $('#numeroDireccion').val(data['number']);
                        $('#pisoDireccion').val(data['complement']);
                        $('-');
                        $('-');
                        $('span#spnNombreComuna').text(data['spnNombreComuna']);
                        $('#cmbRegion').val(data['state']);
                        $('#addressId').val(encodeURIComponent(data['addressName']));
                    },

                    error: function () {

                        $('#addressError').foundation('open');
                        $(document).click(function () {
                            location.reload();
                        });

                    }

                });
            }

        });

    },

    addresDeletePop: function () {

        $(".delete").on("click", function () {

            var addressName = $(this).attr('data-addressname'),
                replaced = "Desea eliminar esta direccion: " + addressName + "?";

            $("#exclude-message").html(replaced);
            $("#address-delete").attr('data-addressname', addressName);
        });

    },

    addresDeleteClick: function () {

        $("#address-delete").on("click", function () {

            var addressName = $(this).attr('data-addressname');

            if (addressName == "") {

                $('#addressError').foundation('open');

                $(document).click(function () {
                    location.reload();
                });

            } else {

                $.ajax({
                    type: "GET",
                    url: "/no-cache/account/address/delete/" + addressName,

                    success: function () {
                        $('#addressDelete').foundation('open');
                        $(document).click(function () {
                            location.reload();
                        });
                    },
                    error: function () {
                        $('#addressError').foundation('open');
                        $(document).click(function () {
                            location.reload();
                        });
                    }
                });
            }

        });

    },

    showContentAccount: function () {

        init();

        function init() {

            profileUser();
            openClose();
            addresEdit();
            addresDelete();
            console.log("controles para edicion de cuenta");
        }

        function profileUser() {

            $(".edit-profile-link a").attr("data-open", "editar-perfil").removeAttr("id").removeAttr("data-toggle");
            $("#editar-perfil").attr("data-reveal", "").attr("class", "reveal-modal medium").attr("data-reveal-ajax", "true").removeAttr("tabindex").removeAttr("style");
            $(".modal-header button").attr("class", "close-reveal-modal").attr("data-close", "").attr("aria-label", "Close").removeAttr("data-dismiss");

        }

        function openClose() {

            $(".edit-profile-link a").on("click", function () {
                // var popup = new Foundation.Reveal($('#editar-perfil'));
                // popup.open();
                // return false;
                $('#editar-perfil').foundation('reveal', 'open');
            });

            $("#profile .save-cancel-buttons button").attr("data-close", "").attr("aria-label", "Close modal").attr("class", "close-reveal-modal");

        }

        function addresEdit() {

            $(".new-address-link a, .edit-address-link a.address-update").attr("data-open", "AddressNew").removeAttr("id").removeAttr("data-toggle").removeAttr("href");

            $("#form-address .save-cancel-buttons button").attr("data-close", "").attr("aria-label", "Close modal").attr("class", "close-reveal-modal");

            $("#addressName").keyup(function () {
                var value = $(this).val();
                $("#receiverName").val(value);
                $("#city").val(value);
            });

            //delete address
            $(".edit-address-link a.delete").attr("href", "#").attr("data-open", "address-remove").removeAttr("id").removeAttr("data-toggle");
            $("#address-remove").attr("data-reveal", "").attr("class", "reveal-modal medium").attr("data-reveal-ajax", "true").removeAttr("tabindex").removeAttr("style");

            //open modal delete 
            $(".edit-address-link a.delete").on("click", function () {
                // var popup = new Foundation.Reveal($('#address-remove'));
                // popup.open();
                // return false;
                $('#address-remove').foundation('reveal', 'open');
            });

            //close modal address
            $("#exclude .save-cancel-buttons button").attr("data-close", "").attr("aria-label", "Close modal");

            //addclass trns
            $(".save-cancel-buttons input#profile-submit, .save-cancel-buttons button.btn-link").addClass("trsn");

        }

        function addresDelete() {

            //address delete exclude click
            $("#address-delete").on("click", function () {

                var addressName = $(this).attr('data-addressname');

                if (addressName == "") {

                    $('#exclude').css('visibility', 'hidden');
                    $('#address-remove').html("<h4>Ha ocurrido un error (addressName). Por favor, intenta nuevamente.</h4>");

                    $('#address-remove').fadeOut(3500, function () {
                        location.reload();
                    });

                } else {

                    $.ajax({
                        type: "GET",
                        url: "/no-cache/account/address/delete/" + addressName,
                        success: function () {
                            $('#exclude').css('visibility', 'hidden');
                            $('#address-remove').html("<h4>Dirección eliminada con éxito!</h4>");
                            $('#address-remove').fadeOut(2200, function () {
                                location.reload();
                            });
                        },
                        error: function () {
                            $('#exclude').css('visibility', 'hidden');
                            $('#address-remove').html("<h4>Ha ocurrido un error inesperado. Por favor, intenta nuevamente.</h4>");
                            $('#address-remove').fadeOut(3500, function () {
                                location.reload();
                            });
                        }
                    });

                }

            });

            $('.address-label').text("Nueva Dirección");

            //address delete open pop
            $(".delete").on("click", function () {

                var addressName = $(this).attr('data-addressname'),
                    replaced = "Realmente desea eliminar esta dirección " + addressName + "?";

                $("#exclude-message").html(replaced);
                $("#address-delete").attr('data-addressname', addressName);

            });

        }

    }

};