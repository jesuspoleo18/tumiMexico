/*----------------------------inicio--------------------------------

[js - principal ]

Projecto:  Tumi México - 2018
Version: 1.0.2
Ultimo cambio: 18/03/2018
Asignado a:  implementacion.
Primary use:  ecommerce. 

----------------------

[Tabla de contenido ]

b0.Init
b1.Configuraciones generales
b2.Home
b3.Producto
b4.Categ/depto
b5.Busca, resultado de busca, 404 y error 500
b6.Account
b7.Quickview
b8.Static
b9.BarbaJS
b10.Login
b11.Master Data

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

$(window).load(function () {
    login.init();
    $(".helperComplement").remove();
    producto.addMoreSku();
    
    if ($producto.length) {
        producto.selectSkuOnLoad();
    }
    quickviewControl.selectSkuOnLoad();
    if ($categDeptoBuscaResultadoBusca.length) {
        categDepto.showProductos('.categ__elements');
        categDepto.asideSticky('.categ__aside .navigation-tabs, .categ__aside .navigation');
    }
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
        confiGenerales.masterDataTrigger();
        confiGenerales.sliderStatic();
        //confiGenerales.modalStatic();
        confiGenerales.replaceHref();
        confiGenerales.bodyPaint();
        confiGenerales.offCanvasIos();
        $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
            // console.log("actualizó");
            confiGenerales.disableEmptyCart();
        });
        console.log("confiGenerales.init()  ˙ω˙");
    },
    offCanvasIos: function(){
        var $a = $(".navigation__left--mobile"),
            $b = $("#offCanvasLeft");
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $a.on("click", function () {
                //         $('#offCanvasLeft').foundation('open', event, "[data-toggle=offCanvasLeft]");
                //         console.log("True");
            });
        }
    },
    disableEmptyCart: function () {
        var $triggerCart = $(".header-cart__content, .navigation-cart__container,.navigation-cart__container--mobile"),
            $a = $('#offCanvasRight'),
            $cartSkuRemove = $(".cartSkuRemove");

        $cartSkuRemove.each(function () {
            $(this).on("click", function () {
                vtexjs.checkout.getOrderForm().done(function (orderForm) {
                    // console.log(orderForm.items.length);
                    if (orderForm.items.length == 0) {
                        $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
                        $triggerCart.unbind();
                    }
                });
            });
        });
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
            $amountCart = $(".header-cart__content").find(".amount-items-em").text(),
            $closeMiniCart = $(".minicart__btn-continueShopping"),
            parseAmountCart = parseInt($amountCart),
            $triggerSearch = $(".navigation__searchTrigger"),
            $triggerSearchMobile = $(".navigation__buttonSearch--mobile"),
            $closeSearch = $(".navigation__closeBar,.navigation__closeBar--mobile"),
            $input = $(".navigation__searchBar [role='textbox']"),
            $a = $('#offCanvasRight'),
            $b = $(".navigation__searchBar"),
            $c = $(".navigation__searchBar--mobile");

        vtexjs.checkout.getOrderForm().done(function (orderForm) {
            // console.log(orderForm.items.length);
            if (orderForm.items.length > 0) {
                $triggerCart.on("click", function (e) {
                    e.preventDefault();
                    $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                });
            }
        });

        $closeMiniCart.on("click", function () {
            $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
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
                    $triggerCart = $(".header-cart__content, .navigation-cart__containe"),
                    item = {
                        id: param[0].split("=")[1],
                        quantity: param[1].split("=")[1],
                        seller: param[2].split("=")[1]
                    };

                e.preventDefault();

                vtexjs.checkout.addToCart([item], null, 3).done(function (orderForm) {
                    $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                    // setTimeout(function () {
                    //     $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
                    // }, 2000);
                    if (orderForm.items.length > 0) {
                        $triggerCart.on("click", function (e) {
                            e.preventDefault();
                            $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                        });
                    }
                    confiGenerales.disableEmptyCart();
                    console.log(orderForm);
                });
            });
        });
    },
    masterDataTrigger: function () {

        var $submitNewsletter = $(".submit__newsletter");

        $submitNewsletter.on("click", function (e) {
            confiGenerales.newsletter();
            e.preventDefault();
        });
    },
    clearData: function () {

        var $email = $("#tm_email");
        // $content = $(".footer-newsletter__content"),
        // $accepted = $(".estatico"),
        // $input = $("input:checkbox"),
        $email.val("");
        // $content.find($input).removeAttr('checked');
        // $nombre.val("");

        // if ($accepted.length) {
        //     $(".estatico-content__contenido input[type='text'],.estatico-content__contenido input[type='email']").val('');
        // }
    },
    newsletter: function () {

        var newsletter = {
                mail: "",
                nombre: ""
            },
            datos = {};

        datos.tm_email = $('#tm_email').val();
        newsletter.mail = $('#tm_email').val();

        // GET
        var Attr = {
            isNewsletterOptIn: true
        };
        /* 
            getFromMasterData() busca en MD si el correo ya fue registrado antes desde vtex
            como por ejemplo: 'desde el checkout', si es así, busca en esa entidad de datos y
            el correo tiene o no el isNewsletterOptIn marcado false o vacío y lo sobreescribe
            por true.
        */
        if (masterDataVtex.getFromMasterData('CL', 'email=' + newsletter.mail, 'email') != undefined) {
            var validateNews = masterDataVtex.getFromMasterData('CL', 'email=' + newsletter.mail, 'isNewsletterOptIn'),
                responseNews = validateNews.isNewsletterOptIn;
            console.log(responseNews);

            if (responseNews == false || responseNews == null) {
                masterDataVtex.postOrPatchInMasterData('CL', newsletter.mail, Attr, 'PATCH');
                $.ajax({
                    accept: 'application/vnd.vtex.ds.v10+json',
                    contentType: 'application/json; charset=utf-8',
                    crossDomain: true,
                    data: JSON.stringify(datos),
                    type: 'POST',
                    url: '//api.vtexcrm.com.br/tumimx/dataentities/TN/documents',

                    success: function (data) {
                        var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                        $.when.apply($, $.map(files, function (file) {
                            return $.getScript(files);
                        })).then(function () {
                            swal({
                                title: 'Felicitaciones, ahora empezará a recibir actualizaciones y ofertas especiales por correo electrónico.',
                                type: 'success',
                                // showCancelButton: true,
                                confirmButtonColor: '#2E2A25',
                                // cancelButtonColor: '#bbb',
                                // cancelButtonText: 'OK',
                                confirmButtonText: 'OK'
                            });
                        }, function err(jqxhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        });
                        confiGenerales.clearData();
                    },
                    error: function (data) {
                        // $('#NewsError').foundation('reveal', 'open');
                        var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                        $.when.apply($, $.map(files, function (file) {
                            return $.getScript(files);
                        })).then(function () {
                            swal({
                                title: 'Verifique que su correo esté bien escrito.',
                                type: 'error',
                                // showCancelButton: true,
                                confirmButtonColor: '#b92335',
                                // cancelButtonColor: '#bbb',
                                // cancelButtonText: 'OK',
                                confirmButtonText: 'OK'
                            });
                        }, function err(jqxhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        });
                    }
                });
            } else {
                var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                $.when.apply($, $.map(files, function (file) {
                    return $.getScript(files);
                })).then(function () {
                    swal({
                        title: 'Usted ya está subscrito a nuestro newsletter.',
                        type: 'info',
                        // showCancelButton: true,
                        // confirmButtonColor: '#E4002B',
                        // cancelButtonColor: '#bbb',
                        // cancelButtonText: 'OK',
                        confirmButtonText: 'OK'
                    });
                    confiGenerales.clearData();
                }, function err(jqxhr, textStatus, errorThrown) {
                    console.log(textStatus);
                });
            }
            // postOrPatchInMasterData('CL', newsletter.mail, Attr, 'PATCH');
        } else {
            /* 
                Si el cliente no existe en la entidad de datos de CL postOrPatchInMasterData() 
                inyecta los datos de nombre y email a la entidad de datos CL y le activa automaticamente
                el cluster isNewsletterOptIn
            */
            console.log("no existe");
            masterDataVtex.postOrPatchInMasterData('CL', newsletter.mail, Attr, 'POST');
            $.ajax({
                accept: 'application/vnd.vtex.ds.v10+json',
                contentType: 'application/json; charset=utf-8',
                crossDomain: true,
                data: JSON.stringify(datos),
                type: 'POST',
                url: '//api.vtexcrm.com.br/tumimx/dataentities/TN/documents',
                success: function (data) {
                    var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                    $.when.apply($, $.map(files, function (file) {
                        return $.getScript(files);
                    })).then(function () {
                        swal({
                            title: 'Sus datos han sido registrados con éxito.',
                            type: 'success',
                            // showCancelButton: true,
                            confirmButtonColor: '#2E2A25',
                            // cancelButtonColor: '#bbb',
                            // cancelButtonText: 'OK',
                            confirmButtonText: 'OK'
                        });
                    }, function err(jqxhr, textStatus, errorThrown) {
                        console.log(textStatus);
                    });
                    confiGenerales.clearData();
                },
                error: function (data) {
                    var files = ["https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.4.1/sweetalert2.all.min.js"];

                    $.when.apply($, $.map(files, function (file) {
                        return $.getScript(files);
                    })).then(function () {
                        swal({
                            title: 'Verifique que su correo esté bien escrito.',
                            type: 'error',
                            // showCancelButton: true,
                            confirmButtonColor: '#b92335',
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
    },
    elementosFormato: function () {

        var $ajaxStopElems = '.skuListPrice,.oldPrice, .skuBestInstallmentValue, em.total-cart-em, td.monetary, span.best-price.new-product-price, td.quantity-price.hidden-phone.hidden-tablet,span.payment-value-monetary,span.payment-installments, .producto-prateleira__info--bestPrice div, .producto-prateleira__info--oldPrice div',
            $porcentaje = $('.porcentaje');

        if ($porcentaje.lenght) {
            $porcentaje.each(function () {

                var valor = $(this).text();
                if (valor == 0) { $(this).remove(); } else { $(this).text(valor.split(',')[0] + '%'); }

            });

        } else { console.log("porcentaje desactivado"); }

        producto.formatoPrecioFichaProductoReplace(".bestPrice,.vtexsc-text");
        porcentaje();

        $(document).ajaxStop(function () {
            producto.formatoPrecioFichaProductoReplace(".bestPrice,.vtexsc-text");
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

        if ($responsive > 770) {
            if ($count.length > 6) {
                $(producto).slick({
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 2,
                    slidesToShow: 6,
                    speed: 500,
                    dots: true
                });
            }
        } else if ($responsive < 750) {
            if ($count.length >= 2) {
                $(producto).slick({
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 2,
                    slidesToShow: 4,
                    speed: 500,
                    dots: true,
                    responsive: [{
                        breakpoint: 426,
                        settings: {
                            arrows: false,
                            autoplay: true,
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: false
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

            // producto.mainImgCarousel();
            producto.traducciones();
            producto.qtdControl();
            producto.textoProducto();
            producto.carousel('.carousel-recomendados,.carousel-vistosReciente');
            producto.accordion('.product__accordion-trigger', '.product__accordion-content');
            producto.compraFichaProducto();
            producto.productoSticky();
            producto.miniatura();
            // producto.formatoPrecioFichaProductoReplace(".skuBestPrice");
            // producto.selectSkuOnClick();
            producto.features();
            setTimeout(producto.userReview, 3000);
            console.log("producto.init()  ˙ω˙");
        }

        // producto.elementosFormato();

    },
    skuOnChange: function () {
        var x = $(".dynamic"),
            colorProducto = x.attr("class"),
            colorProductoPop = colorProducto.split("dynamic "),
            templateColor = '<span class="specificaction__color"></span>';

        if ($(".specificaction__color").length == 0){
            $(".specification").append(templateColor);
        }
        $(".specificaction__color").text(colorProductoPop.pop());
        // producto.mainImgCarousel();

        $(".skuselector-specification-label.input-dimension-Color").on("click", function () {
            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
                setTimeout(function () {
                    var colorProducto = $(".product__container .productName").text(),
                        colorProductoPop = colorProducto.split(" "),
                        $codDisplay = $(".style__ean .ean"),
                        $skuRef = $(".skuReference");

                    $(".specificaction__color").text(colorProductoPop.pop());
                    $codDisplay.text($skuRef.text());
                    // producto.mainImgCarousel();
                    producto.noStock();
                    producto.formatoPrecioFichaProductoReplace(".skuBestPrice");
                }, 800);
            });
        });
    },
    features: function () {
        var $featureBtn = $(".feature-tab__btn"),
            $featureContent = $(".feature-info__content"),
            $featureParent = $(".product__extra-container"),
            $featureDescription = $(".product__container .feature__info-description"),
            $infoTitle = $(".product__container .feature-info__title");

        $featureBtn.text(" ");

        $infoTitle.each(function () {
            var $this = $(this),
                thisClass = $this.attr("class"),
                classSplit = $.trim(thisClass.split("title")[1]),
                featureBtn = $(".product__container .feature-tab__btn");
            // console.log(classSplit);
            $this.parent().addClass(classSplit);
            $('.product__container .' + classSplit + ':hidden').show();
        });

        $featureDescription.eq(0).addClass("active");

        $featureBtn.on("click", function () {
            var $this = $(this),
                thisClass = $this.attr("class"),
                thisClassSplit = $.trim(thisClass.split("btn")[1]);

            $('.product__container .feature__info-description.' + thisClassSplit + '').addClass("active").siblings().removeClass("active");

        });
        // checking for empty features
        if ($featureContent.is(':empty') || $featureContent.text() == '0') {
            $featureParent.remove();
        }
    },
    selectSkuOnLoad: function () {
        var a = $(".group_0"),
            x = $(".dynamic:eq(0)"),
            b = a.find("input:checked");
        if (b.length == 0) {
            x.find("input").attr("checked", "checked");
            x.find("input").change();
            producto.skuOnChange();
            producto.noStock();
        }
    },
    mainImgCarousel: function () {

        var mainProductId;

        if ($responsive <= 725) {

            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
                console.log(product);
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
                    // console.log($elements.pop());
                    $zoomPad.find(".slide-thumb:last-child").remove();
                    $zoomPad.not('.slick-initialized').slick({
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
            $recebeQtyForm = $('.product__sku-container, .product__shop-content'),
            qty = {
                cantidad: ""
            };

        if ($btnComprarProduto.length) {

            if ($recebeQtyForm.length) {

                $recebeQtyForm.prepend($templateQty);

            }

        }

    },
    textoProducto: function () {

        var thisProducto = {
                id: "",
                descripcion: "",
                ean: "",
                caracteristica: "",
                stock: "",
                marca: "",
                cantidad: "",
                coleccion: ""
            },
            $productDescription = $(".productDescription"),
            shadowTemplate = '<div class="dark-overlay producto"></div>',
            templateEan = '<div class="style__ean">Style:<span class="ean"></span></div>';


        $(".product__container #include").prepend(shadowTemplate);
        $productDescription.prepend(templateEan);

        vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

            thisProducto.stock = product.available;
            thisProducto.cantidad = product.skus[0].availablequantity;

            thisProducto.id = product.productId;
            console.log(product);
        });

        $.ajax({
            url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + thisProducto.id + "",
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (data) {

                var arr = data[0].items,
                    $label = $(".dimension-Colorsku,.dimension-Color"),
                    airLine = $(".product__airlineGuide"),
                    $colectionEl = $(".product__collection, .product__allColection a"),
                    $skuSelector = $(".skuselector-specification-label");

                // adding ean code
                thisProducto.ean = data[0].productReference;
                $(".style__ean .ean").html(thisProducto.ean);

                // adding colection name
                if (data[0].Colección != undefined && data[0].Colección != undefined) {
                    thisProducto.coleccion = data[0].Colección[0];
                    $colectionEl.html(thisProducto.coleccion);
                } else if (data[0].Colección == undefined && data[0].Colección == undefined) {
                    $colectionEl.html("");
                }

                // removing label checkbox
                $label.remove();

                // Check for carry on attr
                if (data[0]["CARRY ON"] != undefined && data[0]["CARRY ON"] != undefined) {
                    airLine.addClass("active");
                }

                // wrapping all dynamic classes in $skuSelector
                $skuSelector.wrap('<div class="dynamic"></div>');
                var $dynamic = $(".dynamic");
                $dynamic.each(function(){
                    var inputAttr = $(this).find("input").val();
                    $(this).addClass(inputAttr);
                });
                producto.skuOnChange();
                // looping data items
                // $.each(arr, function (i, val) {
                //     // console.log(val);
                //     var arrImg = val.images,
                //         $skuDinamic = $(".dynamic"),
                //         a = arrImg.slice(-1)[0].imageTag,
                //         b = a.replace(/[#~]/g, "").replace(/-width-\b/g, "-30-").replace(/-height\b/g, "-30").replace(/\s*(width)="[^"]+"\s*/g, " width='30'").replace(/\s*(height)="[^"]+"\s*/g, " height='30'"),
                //         c = '<div class="producto__skuVariant-img">' + b + '</div>';

                //     $(c).appendTo($skuDinamic);
                // });

                // Checking for classes length
                if ($(".Caracteristicas-Exteriores").length) {
                    var $caractExt = $(".Caracteristicas-Exteriores"),
                        $caractExtClass = $(".Caracteristicas-Exteriores").attr("class"),
                        $caractExtSplit = $.trim($caractExtClass.split("field")[1]);
                    $caractExt.parent().addClass($caractExtSplit);
                    dotInfo();
                }
                if ($(".Caracteristicas-Interiores").length) {
                    var $caractInt = $(".Caracteristicas-Interiores"),
                        $caractIntClass = $(".Caracteristicas-Interiores").attr("class"),
                        $caractIntSplit = $.trim($caractIntClass.split("field")[1]);
                    $caractInt.parent().addClass($caractIntSplit);
                }
            }
        });

        function dotInfo() {

            var $textoExt = $("td.Caracteristicas-Exteriores").text(),
                $textoInt = $("td.Caracteristicas-Interiores").text(),
                $containerExt = $("td.Caracteristicas-Exteriores"),
                $containerInt = $("td.Caracteristicas-Interiores"),
                $resultExt = $textoExt.replace(/\|/g, '<p class="space"></p><span class="dot">• </span>'),
                $resultInt = $textoInt.replace(/\|/g, '<p class="space"></p><span class="dot">• </span>');

            $containerExt.html($resultExt);
            $containerInt.html($resultInt);
        }

    },
    addMoreSku: function(){
        var $dynamic = $(".dynamic");
        if ($dynamic.length > 6) {
            var templateMore = '<span class="producto__see-more">More</span>',
                $targetMore = $(".group_0");
            $targetMore.parent().prepend(templateMore);
            $(".producto__see-more").on("click", function(){
                $(this).fadeOut(500);
                $(this).next().addClass("more");
            });
        }
    },
    noStock: function () {
        var $a = $(".buy-button.buy-button-ref"),
            $b = $(".product__shop-container"),
            $c = $(".product__available-text");
        if ($a.css('display') == 'none') {
            $b.fadeOut(500);
            $c.text("No disponible");
        } else {
            if($responsive > 425){
                $b.fadeIn(500);
            }
            $c.text("En Stock");
        }
    },
    carousel: function (el) {

        if ($responsive > 768) {

            $(".helperComplement").remove();

            var $countRecomended = $(".product__recomended-content .prateleira").find(".img"),
                $countRecently = $(".product__recently-content .prateleira").find(".img");

            if ($countRecomended.length >= 6) {
                $(".product__recomended-content .prateleira").children().addClass("carousel-recomendados");
                $('.carousel-recomendados').on("init", function () {
                    $(this).addClass('active');
                });
                $('.carousel-recomendados').slick({
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 2,
                    slidesToShow: 6,
                    speed: 500,
                    dots: true
                });
            }
            if ($countRecently.length >= 6) {
                $(".product__recently-content .prateleira").children().addClass("carousel-vistosReciente");
                $('.carousel-vistosReciente').on("init", function () {
                    $(this).addClass('active');
                });
                $('.carousel-vistosReciente').slick({
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 2,
                    slidesToShow: 6,
                    speed: 500,
                    dots: true
                });
            }
        } else if ($responsive < 758) {
            var $count = $(".product__recomended-content .prateleira").find(".img");
            if ($count.length >= 2) {
                $(".helperComplement").remove();
                $(".product__recomended-content .prateleira").children().addClass("carousel-recomendados");
                $(".product__recently-content .prateleira").children().addClass("carousel-vistosReciente");

                $(el).on("init", function () {
                    $(this).addClass('active');
                });
                $(el).slick({
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slide: 'li',
                    slidesToScroll: 1,
                    slidesToShow: 2,
                    speed: 500,
                    dots: true
                });
            }
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
                $triggerCart = $(".header-cart__content, .navigation-cart__container"),
                qtyBox = parseInt($('.product__container .qtd.pull-left').val()),
                // qtyBox = parseInt($('.product__sku-container .box-qtd .qtd').val()),
                item = {
                    id: param[0].split("=")[1],
                    quantity: qtyBox,
                    // quantity: param[1].split("=")[1], 
                    seller: param[2].split("=")[1]
                };

            vtexjs.checkout.addToCart([item], null, 3).done(function (orderForm) {

                $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                if (orderForm.items.length > 0) {
                    $triggerCart.on("click", function (e) {
                        e.preventDefault();
                        $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
                    });
                }
                confiGenerales.disableEmptyCart();
                // setTimeout(function () {
                //     $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
                // }, 2000);
                // console.log(orderForm);

            });

            return false;

        });

    },
    productoSticky: function () {

        var $elShow = $(".producto-sticky-container"),
            $responsive = $(window).width();

        if ($responsive < 768) {

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
        var $descriptionEl = $(".product__accordion-trigger");

        // hiding content
        $(content).hide();
        // execute accordion
        $(trigger).on("click", function () {
            $(this).toggleClass("active").next().slideToggle("slow");
            return false;
        });
        // open descripcion
        $descriptionEl.each(function () {
            if ($(this).text() == "Sobre este artículo") {
                $(this).addClass("active").next().addClass("active").slideToggle("slow");
            }
        });
    },
    formatoPrecioFichaProductoReplace: function (seletor) {

        $(seletor).each(function () {

            var novoConteudoPreco = $(this).text();

            if (novoConteudoPreco.indexOf(',00') > -1) {

                var padrao = /([$\s\d.]*)([,\d]+)/gm;

                novoConteudoPreco = novoConteudoPreco.replace(".", "-").replace(",", ".").replace("-", ",");
                // novoConteudoPreco = novoConteudoPreco.replace(".", "-").replace(",", ".").replace("-", ",");

                $(this).html(novoConteudoPreco);

            }

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

            categDepto.traducciones();
            categDepto.infinityScroll();
            categDepto.categDeptoAccordion('.search-multiple-navigator h4,.search-multiple-navigator h5', '.search-multiple-navigator h3');
            categDepto.categOptions();
            categDepto.eventHasChange();
            categDepto.changeControls();
            categDepto.filterProducts();
            //setInterval(categDepto.traducciones,800);
            // setInterval(confiGenerales.mainLazyLoad, 800);
            console.log("categDepto.init()  ˙ω˙");

        }

    },
    filterProducts: function () {
        $(document).on('change', '.multi-search-checkbox', function () {
            if (this.checked) {
                $(".bt-refinar.search-filter-button.even").click();
            }
        });
    },
    showProductos: function (object) {
        var $object = $(object),
            $effectOut = function (el) {
                return el.fadeOut(500);
            },
            $effectIn = function (el) {
                return el.fadeIn(1500).css("display", "flex");
            };

        $.when($effectIn($object)).done(function () {
            categDepto.carouselPrateleira();
            categDepto.skuImgPrateleira();
        });
    },
    traducciones: function () {
        var $breadCrumb = $(".bread-crumb ul li:eq(0)");
        $breadCrumb.html("<a href='/'>Home</a>");
    },
    carouselPratError: function(){
        var $prat = $(".prateleira__container");
        
        $prat.each(function(){
            $(this).on("mouseenter", function () {
                var $accepted = $(this).find(".slick-list.draggable");
                if ($accepted.length) {
                    $dragable = $(this).find(".slick-list.draggable .slide-thumb");
                    $dragable.each(function () {
                        var $thisDragable = $(this),
                            $dragableImg = $thisDragable.find("img");
                        if ($dragableImg.length > 3) {
                            $thisDragable.addClass("error");
                        }
                    });
                }
            });
        });
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
                        // console.log("vitrina ejecutada");
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
                                success: function (data) {
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
                                        $arrows = $(".prateleira__container:hover .slick-next, .prateleira__container:hover.slick-prev"),
                                        $slickThumb = _thisImg.find(".slide-thumb.hover"),
                                        imgHref = $img.attr("href"),
                                        $slickThumbLast = _thisImg.find(".slide-thumb:last-child");

                                    $img.removeAttr("href");

                                    $slickThumbLast.remove();
                                    _thisImg.find("img:eq(0)").appendTo($slickThumb);

                                    if (_thisImg.length) {

                                        _thisImg.not('.slick-initialized').slick({
                                            arrows: true,
                                            autoplay: false,
                                            autoplaySpeed: 2500,
                                            button: false,
                                            dots: false,
                                            fade: true,
                                            infinite: false,
                                            slidesToScroll: 1,
                                            slidesToShow: 1,
                                            speed: 800,
                                            useTransform: true
                                        });

                                        // var $dragable = _thisImg.find(".slick-list.draggable");
                                        // $img.attr("href","");
                                        // $dragable.on("click", function(){
                                        //     window.location.href = imgHref;
                                        // });
                                        // $img.on("click", function (e) {
                                        //     e.preventDefault();
                                        // });
                                        if ($slickThumb.length) {
                                            // console.log("cantidad de slicks-thumbs!: " + $slickThumb.length);
                                            $(z).appendTo($slickThumb);
                                            // $slickThumb.css("border", "1px solid red");
                                            var $accepted = _thisImg.find(".slick-list.draggable");
                                            if ($accepted.length) {
                                                $dragable = _thisImg.find(".slick-list.draggable .slide-thumb");
                                                $dragable.each(function () {
                                                    var $thisDragable = $(this),
                                                        $dragableImg = $thisDragable.find("img"),
                                                        $toRemove = $thisDragable.find("img:gt(3)");
                                                        $dragableImg.on("click", function(){
                                                            window.location.href = imgHref;
                                                        });
                                                    if ($dragableImg.length > 3) {
                                                        $thisDragable.addClass("error");
                                                        $toRemove.remove();
                                                    }
                                                });
                                            }
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

            var $attrColor = $(".search-multiple-navigator h5.Atributos"),
                // $otherMenuOpen = $(".even.Atributos.Tumi, .refino.Atributos.Tumi.colorin"),
                $content = $('.navigation-tabs .search-single-navigator ul'),
                $verFiltros = $content.find('.ver-filtros');

            $attrColor.each(function () {
                if ($(this).text() == 'Grupo Color') {
                    $(this).parent().addClass('colorin');
                }
            });
            $(".colorin input").each(function () {
                var $thisAttr = $(this).attr('value'),
                    template = '<span class="colorValue' + " " + $thisAttr + '"></span>';
                $(this).parent().addClass("input-label");
                $(this).parent().wrap('<div class="contentColorValue"></div>');
                $(this).parents(".contentColorValue").prepend(template);
            });

            var $colorin = $(".colorin h5"),
                $otherMenuOpen = $(".Atributos.Tumi.colorin h5");

            $(trigger).next().hide();
            $(secondTrigger).next().hide();
            $(secondTrigger).next().next().hide();

            $(trigger).on("click", function () {

                $(this).toggleClass("active").next().slideToggle("slow");
                if ($colorin.length) {
                    console.log("true");
                    $(".categ__content .colorin div:eq(0), .categ__aside.mobile .colorin div:eq(0)").css({
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

            // $otherMenuOpen.addClass("active").next().slideToggle("slow");

            if ($colorin.hasClass('active')) {
                $(".categ__content .colorin div:eq(0), .categ__aside.mobile .colorin div:eq(0)").css({
                    "display": "flex",
                    "flex-flow": "row wrap",
                    "justify-content": "flex-start"
                });
            }
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

                var $desktop = $(".prateleira[id*=ResultItems]");

                if ($responsive < 650) {

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
                            // confiGenerales.replaceHref();
                            // confiGenerales.wishlistOnclick();
                            // confiGenerales.compraAsyncVitrina();
                            // categDepto.skuImgPrateleira();
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
                return el.fadeIn(500).css("display", "flex");
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
    changeControls: function () {

        var aNextTop = $(".pager.top:eq(1) .next"),
            aPrevTop = $(".pager.top:eq(1) .previous");

        aNextTop.on("click", function () {
            $(".pager.top:eq(0) .next").click();
        });
        aPrevTop.on("click", function () {
            $(".pager.top:eq(0) .previous").click();
        });

    },
    cloneCategControls: function (el) {
        var a = $(el).clone(),
            $filter = $(".categ__options-bottom.bottom .categ__filters");
        if ($filter.length) {
            $filter.remove();
            $(".categ__options-bottom.bottom").html(a);
        }
    },
    skuImgPrateleira: function () {

        if ($responsive > 650) {
            var $prateleiraInfo = $(".prateleira__container");
            // var $prateleiraInfo = $(".prateleira__info");
            $prateleiraInfo.each(function () {

                // $(this).one("mouseenter", function () {
                var $this = $(this),
                    $skuInput = $this.find(".prateleira__info .insert-sku-checkbox"),
                    $inputParent = $this.find(".prateleira__info .is-checklist-item"),
                    $templateImg = '<div class="prateleira__skuVariant-img"></div>',
                    $validate = $this.find(".prateleira__info .prateleira__skuVariant-img");

                if ($validate.length == 0) {

                    $($templateImg).appendTo($inputParent);

                    var skuInputAttr = $skuInput.attr("rel");
                    // $inputParent.append($templateImg);
                    $.ajax({
                        url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=skuId:" + skuInputAttr + "",
                        dataType: 'json',
                        type: 'GET',
                        crossDomain: true,
                        success: function (data) {
                            // console.log(data[0].items[0].images);
                            // console.log(data);
                            var arr = data[0].items,
                                dataLink = data[0].link,
                                $skuVariantImg = $this.find(".prateleira__info .prateleira__skuVariant-img"),
                                $fadeEl = $this.find(".prateleira__skuVariant-container,.product-insertsku.must-login"),
                                $lastImg = [];

                            $.each(arr, function (i, val) {
                                // console.log(val);
                                var arrImg = val.images,
                                    arrSku = val.itemId,
                                    a = arrImg.slice(-1)[0].imageTag,
                                    b = a.replace(/[#~]/g, "").replace(/-width-\b/g, "-30-").replace(/-height\b/g, "-30").replace(/\s*(width)="[^"]+"\s*/g, " width='30'").replace(/\s*(height)="[^"]+"\s*/g, " height='30'"),
                                    c = '<a href= "' + dataLink + '?idsku=' + arrSku + '">' + b + '</a>';
                                // attrSku = dataLink + '?idsku=' + arrSku;

                                $(c).appendTo($skuVariantImg);
                                if ($this.find(".prateleira__skuVariant-container .insert-sku-checklist li").length > 3){
                                    var $skuMoreParent = $this.find(".prateleira__skuVariant-container .insert-sku-checklist"),
                                        $skuMoreTemplate =  '<span class="prateleira__sku-more"></span>';
                                    $skuMoreParent.addClass("more");
                                    if ($this.find(".prateleira__skuVariant-container .prateleira__sku-more").length == 0){
                                        $skuMoreParent.append($skuMoreTemplate);
                                        $this.find(".prateleira__skuVariant-container .prateleira__sku-more").text($this.find(".prateleira__skuVariant-container .insert-sku-checklist li").length);
                                    }
                                }
                                $fadeEl.fadeIn();
                            });
                        }
                    });
                }
                // });
            });
        }
    },
    eventHasChange: function () {

        $(window).bind('hashchange', function () {
            // console.log("cambio");
            setTimeout(function () {
                categDepto.carouselPrateleira();
                categDepto.changeControls();
                categDepto.cloneCategControls(".categ__options .categ__filters");
                categDepto.skuImgPrateleira();
                categDepto.changeControls();
            }, 1200);
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

var regiones = [],
    comunas = [],
    country = 'CHL';

var account = {

    init: function init() {

        var $account = $("body.account");

        if ($account.length) {

            account.loadRegionComuna();
            account.addresUpdate();
            account.addresDeletePop();
            account.addresDeleteClick();
            account.showContentAccount();
            setInterval(account.traducciones, 2000);

            $('#formAddressNew').submit(function (e) {

                e.preventDefault();
                account.createAddress();
            });
            console.log("controles generales");
        }
    },

    traducciones: function traducciones() {

        var $apellido = $(".profile-detail-display-nickname .title:contains('Apelido:')"),
            $telefono = $(".profile-detail-display-cellphone .title:contains('Telefone Comercial')");

        $apellido.text('Apellido:' + ' ');
        $telefono.text('Teléfono Comercial:' + ' ');
    },

    loadRegionComuna: function loadRegionComuna() {

        $.ajax({

            type: "GET",
            dataType: 'html',
            url: 'https://io.vtex.com.br/front.shipping-data/2.20.11/script/rule/CountryCHL.js',

            success: function success(response) {

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
                            codigo: data[region][comuna]
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
                            if (value.id_region == id) $("#cmbComuna").append(new Option(value.nombre, value.codigo));
                        });

                        $("#cmbComuna").change(function () {
                            var _this = this;

                            if ($(this).val() != "") {
                                var comuna = comunas.find(function (c) {
                                    return c.codigo == $(_this).val();
                                });
                                $("#spnNombreComuna").text(comuna.nombre);
                            } else { }
                        });
                    }
                });
            }

        });
    },

    createAddress: function createAddress() {

        var country = $("meta[name='country']").attr("content"),
            addressName = $('#aliasDireccion').val(),
            receiverName = $('#destinatario').val(),
            addressType = '1',
            postalCode = $('#cmbComuna').val(),
            street = $('#direccion').val(),
            number = $('#numeroDireccion').val(),
            neighborhood = $('#spnNombreComuna').text(),
            city = '-',
            country = $('#country').val(),
            complement = $('#pisoDireccion').val(),
            reference = '-',
            state = $('#cmbRegion').val(),
            userId = $('#userId').val(),
            addressId = $('#addressId').val(),
            dataString = 'addressName=' + addressName + '&receiverName=' + receiverName + '&addressType=' + addressType + '&postalCode=' + postalCode + '&street=' + street + '&number=' + number + '&complement=' + complement + '&reference=' + reference + '&neighborhood=' + neighborhood + '&city=' + city + '&state=' + state + '&country=' + country + '&userId=' + userId + '&addressId=' + addressId;
        //alert (dataString); return false;

        $.ajax({

            type: "POST",
            url: "/no-cache/account/address/save",
            data: dataString,

            success: function success(data) {

                // document.getElementById('newsLetter_form').reset();
                $('#addressAprob').foundation('open');

                $(document).click(function () {
                    location.reload();
                });
            },

            error: function error(data) {

                $('#addressError').foundation('open');

                $(document).click(function () {
                    location.reload();
                });
            }

        });
    },

    addresUpdate: function addresUpdate() {

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
            } else {

                $.ajax({

                    dataType: "json",
                    url: "/no-cache/account/address/detail/" + addressName,

                    success: function success(data) {

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

                    error: function error() {

                        $('#addressError').foundation('open');
                        $(document).click(function () {
                            location.reload();
                        });
                    }

                });
            }
        });
    },

    addresDeletePop: function addresDeletePop() {

        $(".delete").on("click", function () {

            var addressName = $(this).attr('data-addressname'),
                replaced = "Desea eliminar esta direccion: " + addressName + "?";

            $("#exclude-message").html(replaced);
            $("#address-delete").attr('data-addressname', addressName);
        });
    },

    addresDeleteClick: function addresDeleteClick() {

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

                    success: function success() {
                        $('#addressDelete').foundation('open');
                        $(document).click(function () {
                            location.reload();
                        });
                    },
                    error: function error() {
                        $('#addressError').foundation('open');
                        $(document).click(function () {
                            location.reload();
                        });
                    }
                });
            }
        });
    },

    showContentAccount: function showContentAccount() {

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
            $("#editar-perfil").attr("data-reveal", "").attr("class", "reveal").attr("data-reveal-ajax", "true").removeAttr("tabindex").removeAttr("style");
            $(".modal-header button").attr("class", "close-button").attr("data-close", "").attr("aria-label", "Close modal").removeAttr("data-dismiss");
        }

        function openClose() {

            $(".edit-profile-link a").on("click", function () {
                var popup = new Foundation.Reveal($('#editar-perfil'));
                popup.open();
                return false;
            });

            $("#profile .save-cancel-buttons button").attr("data-close", "").attr("aria-label", "Close modal");
        }

        function addresEdit() {

            $(".new-address-link a, .edit-address-link a.address-update").attr("data-open", "AddressNew").attr("aria-controls", "AddressNew").attr("aria-haspopup", "true").attr("tabindex", "0").removeAttr("id").removeAttr("data-toggle").removeAttr("href");

            $("#form-address .save-cancel-buttons button").attr("data-close", "").attr("aria-label", "Close modal");

            $("#addressName").keyup(function () {
                var value = $(this).val();
                $("#receiverName").val(value);
                $("#city").val(value);
            });

            //delete address
            $(".edit-address-link a.delete").attr("href", "#").attr("data-open", "address-remove").removeAttr("id").removeAttr("data-toggle");
            $("#address-remove").attr("data-reveal", "").attr("class", "reveal").attr("data-reveal-ajax", "true").removeAttr("tabindex").removeAttr("style");

            //open modal delete
            $(".edit-address-link a.delete").click(function () {
                var popup = new Foundation.Reveal($('#address-remove'));
                popup.open();
                return false;
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
                        success: function success() {
                            $('#exclude').css('visibility', 'hidden');
                            $('#address-remove').html("<h4>Dirección eliminada con éxito!</h4>");
                            $('#address-remove').fadeOut(2200, function () {
                                location.reload();
                            });
                        },
                        error: function error() {
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

            var $iframeThis = $(this),
                $iframeBuySuccess = $(".TB_compraExitosa"),
                $thisBtn = $(".buy-button.buy-button-ref"),
                $ean = $("#quickview__style-number"),
                thisProducto = {
                    id: "",
                    descripcion: "",
                    ean: "",
                    caracteristica: "",
                    stock: "",
                    marca: "",
                    cantidad: "",
                    coleccion: "",
                    url: ""
                },
                $productoName = $(".notifyme-client-name"),
                $productoEmail = $(".notifyme-client-email");

            // $productoName.attr("placeholder", "NOMBRE");
            // $productoEmail.attr("placeholder", "EMAIL");

            quickviewControl.qtdControl();

            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {

                thisProducto.stock = product.available;
                thisProducto.id = product.productId;
                console.log(product);

                $.ajax({
                    url: "https://tumimx.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:" + thisProducto.id + "",
                    dataType: 'json',
                    type: 'GET',
                    crossDomain: true,
                    success: function (data) {

                        var arr = data[0].items[0].images,
                            arrItems = data[0].items,
                            apiUrl = data[0].linkText,
                            thisUrl = '/' + apiUrl + '/p',
                            details = $(".quickview__productDetail a"),
                            $zoomPad = $(".quickview__img-content .zoomPad"),
                            $label = $(".dimension-Colorsku"),
                            $skuSelector = $(".skuselector-specification-label"),
                            $colectionEl = $(".quickview__collection"),
                            $elements = [];

                        // adding ean code
                        thisProducto.ean = data[0].productReference;
                        $ean.html(thisProducto.ean);

                        // adding colection name
                        if (data[0].Colección != undefined && data[0].Colección != undefined) {
                            thisProducto.coleccion = data[0].Colección[0];
                            $colectionEl.html(thisProducto.coleccion);
                        } else if (data[0].Colección == undefined && data[0].Colección == undefined) {
                            $colectionEl.html("");
                        }

                        // defining variables
                        thisProducto.descripcion = data[0]['Descripción Larga'];
                        thisProducto.ean = data[0].items[0].ean;
                        thisProducto.marca = data[0].brand;

                        // removing labels from skus
                        $label.remove();
                        $skuSelector.eq(0).click().attr("checked", "checked");
                        $skuSelector.wrap('<div class="dynamic"></div>');
                        var $dynamic = $(".dynamic");
                        $dynamic.each(function () {
                            var inputAttr = $(this).find("input").val();
                            $(this).addClass(inputAttr);
                        });
                        quickviewControl.skuOnChange();
                        // add images to sku selections product
                        // $.each(arrItems, function (i, val) {
                        //     // console.log(val);
                        //     var arrImg = val.images,
                        //         $skuDinamic = $(".dynamic"),
                        //         sliceIt = arrImg.slice(-1)[0].imageTag,
                        //         template = sliceIt.replace(/[#~]/g, "").replace(/-width-\b/g, "-30-").replace(/-height\b/g, "-30").replace(/\s*(width)="[^"]+"\s*/g, " width='30'").replace(/\s*(height)="[^"]+"\s*/g, " height='30'"),
                        //         c = '<div class="producto__skuVariant-img">' + template + '</div>';

                        //     $(c).appendTo($skuDinamic);
                        // });

                        details.on("click", function () {
                            window.top.location.href = thisUrl;
                        });
                        // console.log(data[0].items[0].images);
                        // producto.descripcion = data[0]['Descripción Larga'];
                        // producto.caracteristica = data[0].Características[0];
                        thisProducto.descripcion = data[0].description;
                        thisProducto.ean = data[0].items[0].ean;
                        thisProducto.marca = data[0].brand;

                        // console.log(data);

                        // $.each(arr, function (i, val) {
                        //     var a = val.imageTag,
                        //         b = a.replace(/[#~]/g, "").replace(/-width-\b/g, "-600-").replace(/-height\b/g, "-600").replace(/\s*(width)="[^"]+"\s*/g, " width='600'").replace(/\s*(height)="[^"]+"\s*/g, " height='600'"),
                        //         z = '<div class="slide-thumb">' + b + '</div>';
                        //     $elements.push(z);
                        // });

                        // $zoomPad.html($elements);

                        // $zoomPad.slick({
                        //     arrows: true,
                        //     autoplay: false,
                        //     autoplaySpeed: 2500,
                        //     button: false,
                        //     dots: true,
                        //     fade: false,
                        //     infinite: true,
                        //     slidesToScroll: 1,
                        //     slidesToShow: 1,
                        //     speed: 800,
                        //     useTransform: true
                        // });
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

                    vtexjs.checkout.getOrderForm().done(function () {

                        vtexjs.checkout.addToCart([item], null, 3).done(function (orderForm) {
                            var orderFormItem = orderForm.items.length;
                            window.parent.quickviewControl.refreshMiniCart(orderFormItem);
                        });
                    });
                });

            }); // /.fin getCurrentProductWithVariations.
        });
    },
    refreshMiniCart: function (x) {
        var $a = $('#offCanvasRight');

        vtexjs.checkout.getOrderForm();
        $("#TB_overlay", document.body).remove();
        $("#TB_window", document.body).remove();
        $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
        // setTimeout(function () {
        //     $a.foundation('close', event, "[data-toggle=offCanvasLeft]");
        // }, 2000);
        if (x > 0) {
            $triggerCart.on("click", function (e) {
                e.preventDefault();
                $a.foundation('open', event, "[data-toggle=offCanvasLeft]");
            });
        }
        confiGenerales.disableEmptyCart();
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

    },
    selectSkuOnLoad: function () {

        if($("body.quickview").length){
            var a = $(".group_0"),
                x = $(".dynamic:eq(0)"),
                b = a.find("input:checked");
            if (b.length == 0) {
                x.find("input").attr("checked", "checked");
                x.find("input").change();
                setTimeout(function(){
                    quickviewControl.noStock();
                    quickviewControl.skuOnChange
                }, 800);
            }
        }
    },
    noStock: function () {
        var a = $(".buy-button.buy-button-ref"),
            b = $(".quickview__buy-btn"),
            c = $(".quickview__stock span");
        if (a.css('display') == 'none') {
            b.fadeOut(500);
            c.text("No disponible");
        } else {
            b.fadeIn(500);
            c.text("En Stock");
        }
    },
    skuOnChange: function () {
        var x = $(".dynamic"),
            colorProducto = x.attr("class"),
            colorProductoPop = colorProducto.split("dynamic "),
            templateColor = '<span class="specificaction__color"></span>';

        if ($(".specificaction__color").length == 0) {
            $(".specification").append(templateColor);
        }
        $(".specificaction__color").text(colorProductoPop.pop());
        // producto.mainImgCarousel();

        $(".skuselector-specification-label.input-dimension-Color").on("click", function () {
            vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
                setTimeout(function () {
                    var $colorProducto = $(".quickview__name .productName").text(),
                        colorProductoPop = $colorProducto.split(" ");

                    $(".specificaction__color").text(colorProductoPop.pop());
                    // producto.mainImgCarousel();
                    quickviewControl.noStock();
                }, 800);
            });
        });
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
    anchoring: function () {
        // Select all links with hashes
        $('.static__options-anchorLinks-content a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('.static__options-anchorLinks-content [href="#"]')
            .not('.static__options-anchorLinks-content [href="#0"]')
            .click(function (event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: (target.offset().top - 100)
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
                            }
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

/* 

[b10.Login]

============================= */

var login = {
    init: function () {

        if ($login.length) {
            login.insertElements();
        }

    },
    insertElements: function () {
        var $modalBody = $(".modal-body"),
            $heading = $(".vtexIdUI-heading"),
            $loginBody = $(".vtexIdUI-main-content"),
            $googleBtn = $("#vtexIdUI-google-plus"),
            templateGoogleBtn = '<div class="login__logo-google"><img src="/arquivos/icon-google-3.png"/></div>',
            templateClose = '<div class="login__close-btn"></div>',
            templateSubHeading = '<h5 class="login__subtitle">Inicie sesión en su cuenta de TUMI</div>',
            templatePrivacy = '<div class="login__info-container"><div class="login__info-content">Cuando entra en su cuenta, acepta nuestra <a href="/ayuda/politica-privacidad">Politica de Privacidad.</a></div>',
            $exit = $("#vtexIdUI-global-loader");

        $heading.prepend(templateSubHeading);
        $googleBtn.prepend(templateGoogleBtn);
        $modalBody.append(templatePrivacy);
        $loginBody.prepend(templateClose);

        $(".login__close-btn").on("click", function () {
            window.history.go(-1);
        });
    }
};

/* 

[b11.Master Data]

============================= */

var masterDataVtex = {

    getFromMasterData: function (name, where, fields) {

        var store = 'tumimx',
            urlProtocol = window.location.protocol,
            apiUrl = urlProtocol + '//api.vtex.com/' + store + '/dataentities/' + name + '/search?_where=' + where + '&_fields=' + fields,
            dataR,
            response;

        $.ajax({
            "headers": {
                "Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
            },
            "url": apiUrl,
            "async": false,
            "crossDomain": true,
            "type": "GET",

            success: function (dataR) {
                response = dataR[0];
                // console.log("");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                response = dataR;
                console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
            }

        });

        return response;

    },
    postOrPatchInMasterData: function (name, email, fields, type) {

        // var urlProtocol = window.location.protocol;
        var store = 'tumimx',
            apiUrl = '//api.vtexcrm.com.br/' + store + '/dataentities/' + name + '/documents',
            who = {
                "email": email
            },
            data = $.extend(who, fields),
            response;

        $.ajax({

            "headers": {
                "Accept": "application/vnd.vtex.ds.v10+json",
                "Content-Type": "application/json"
            },
            "url": apiUrl,
            "async": false,
            "crossDomain": true,
            "type": type,
            "data": JSON.stringify(data),

            success: function (data) {
                console.log("el post se envío");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
            }

        });

    }
};