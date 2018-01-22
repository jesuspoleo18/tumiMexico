// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

/*=============================================
=            checkout js            =
=============================================*/

$(function(){init();});

function init(){
	carrito.init();
}

var carrito = {

	init: function(){

		//setInterval(carrito.elementosFormato, 2500);
		carrito.campoSexo();
		carrito.profileMasterdata();
		carrito.cupon();
	},

	formatoDecimales: function(seletor){
                
        $(seletor).each(function() {

            var novoConteudoPreco = $(this).text();

            if (novoConteudoPreco.indexOf(',') > -1)  {

                var padrao = /([$\s\d,]*)([.\d]+)/gm;

                novoConteudoPreco = novoConteudoPreco.replace(padrao, '$1').replace(',','.'); 

                $(this).html(novoConteudoPreco);

            }

        });

    },

    elementosFormato: function(){

        var $ajaxStopElems = '.total-selling-price, .monetary, .new-product-price, .sla-value, .sight, .description .price.pull-right, .shipping-option-item-value, .delivery-windows .radio span, .old-product-price.muted';

        carrito.formatoDecimales($ajaxStopElems);
        porcentaje();

        $(document).ajaxStop(function(){
            carrito.formatoDecimales($ajaxStopElems);
        });

    },

	campoSexo: function(){

		var $sexForm = "<div class='sexForm__container'><div class='newsletter__femenino'> <input id='sp_femenino' type='checkbox' name='sp_femenino' value='femenino'> <label for='femenino'>Feminino</label> </div> <div class='newsletter__masculino'> <input id='sp_masculino' type='checkbox' name='sp_masculino' value='masculino'> <label for='masculino'>Masculino</label> </div></div>",
			$target = $(".client-last-name"),
			$targetBtn = $(".submit.btn-submit-wrapper"),
			$submitBtn = $("<button type='submit' id='sp_checkout' class='sp_checkout' name='submit' value='Enviar'></button>");

		$targetBtn.prepend($submitBtn);
		$target.after($sexForm);

	},

	profileMasterdata: function(){

		var $fem = $('#sp_femenino'),
			$masc = $('#sp_masculino'),
			$sexContainer = $('.sexForm__container'),
			$errorGender = '<p id="errorGender"></p>';

		$sexContainer.after($errorGender);

		$fem.on("change",function(){
			$masc.attr('checked', false);
		});

		$masc.on("change",function(){
			$fem.attr('checked', false);
		});

		$('#sp_checkout').on("click", function(e){

			var $femenino = $('#sp_femenino:checked'),
				$masculino = $('#sp_masculino:checked'),
				$errorGenderMessage = '<span>Este campo es obligatorio</span>',
				$submitBtn = $(".sp_checkout");

			if($femenino.length || $masculino.length){
				genero();
				$("#errorGender").hide();
				$submitBtn.hide();
			}else{
				$("#errorGender").html($errorGenderMessage);
			}

		    e.preventDefault();

		});

		function genero(){

		    var datos = {};
		    	
		    	datos.sp_email = $("#client-email").val();
		    	datos.sp_nombre = $("#client-first-name").val();
		    	datos.sp_apellido = $("#client-last-name").val();
		    	datos.sp_documento = $("#client-document").val();
		    	datos.sp_telefono = $("#client-phone").val();
		        datos.sp_femenino = $('#sp_femenino:checked').val();
		        datos.sp_masculino = $('#sp_masculino:checked').val();
		        
		    $.ajax({

		        accept: 'application/vnd.vtex.ds.v10+json',
		        contentType: 'application/json; charset=utf-8',
		        crossDomain: true,
		        data: JSON.stringify(datos),
		        type: 'POST',
		        url: '//api.vtexcrm.com.br/samsonitear/dataentities/SP/documents',
		        
		        success: function(data){
		            
		            var $submitBtn = $(".sp_checkout"),
		            	$targetBtn = $("#go-to-payment");

		            $submitBtn.hide();
		            $targetBtn.click();

		            console.log("se enviaron los datos satisfactoriamente");

		        },
		        error: function(data) {
		           console.log("Hubo un error en enviar la información a la entidad de datos");
		        }

		    });

		}

	},

	cupon: function(){

		var $trigger = $(".link-coupon-add");

		$trigger.click();
	}

}

/*=====  End of checkout js  ======*/