// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE.
// THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.
$(function () {
    setTimeout(ancla, 800);
});

function ancla() {

    var $el = $(".fl.w-100.w-100-ns"),
        $object = '<p class="orderForm-ancla">No olvide revisar y enviar los datos para factura haciendo click <a href="#divFormCompraFactura">aquí.</a></p>';

    $($object).insertAfter($el);

}

// -------------------------------- FACTURA ---------------------------------------------  

var urlFormulario = "https://www.tumi.com.mx/Factura";
var urlFormularioSuccess = "https://www.tumi.com.mx/Factura/FacturaSuccess";

var urlVtexMaster = "https://api.vtexcrm.com.br/tumimx/dataentities/CF/documents";
var urlVtexMasterSearch = "https://api.vtexcrm.com.br/tumimx/dataentities/CF/search?_where=PFAC_EMAIL={0}&_fields=id,PFAC_ORDERFORMID,PFAC_NROPEDIDO,PFAC_COMUNA,PFAC_DEPTO,PFAC_DIG,PFAC_DIRECCION,PFAC_GIRO,PFAC_EMAIL,PFAC_NUMERO,PFAC_RAZONSOCIAL,PFAC_REGION,PFAC_RUT,PFAC_TELEFONO1,PFAC_TELEFONO2,PFAC_NOMBREFANTASIA,PFAC_NOMBRECONTACTO";

var idClassContenedor = "#app-container";
var regiones = [];
var comunas = [];
var emailContacto = '';
var transactionId = '';
var htmlSuccess = '';

var entity = {
    id: "",
    PFAC_ORDERFORMID: "",
    PFAC_NROPEDIDO: "",
    PFAC_COMUNA: "",
    PFAC_DEPTO: "",
    PFAC_DIG: "",
    PFAC_DIRECCION: "",
    PFAC_GIRO: "",
    PFAC_EMAIL: "",
    PFAC_NUMERO: "",
    PFAC_RAZONSOCIAL: "",
    PFAC_REGION: "",
    PFAC_RUT: 0,
    PFAC_TELEFONO1: "",
    PFAC_TELEFONO2: "",
    PFAC_NOMBREFANTASIA: "",
    PFAC_NOMBRECONTACTO: ""
};

$(document).ready(function () {
    Factura();
});

function Factura() {
    setTimeout(function () {
        if ($(idClassContenedor).length > 0) {
            transactionId = $("#order-id").text(); //dataLayer[4].transactionId;
            emailContacto = $(".cconf-client-email").text();//dataLayer[4].visitorContactInfo[0];

            $.ajax({
                url: urlFormulario,
                crossDomain: true,
                type: 'GET',
                dataType: 'html',
                success: function (response) {
                    var html = $.parseHTML(response);
                    var result = $(html).filter('.wrapFormFactura');
                    // $(result).insertBefore(idClassContenedor);
                    $(result).insertAfter('.w-100.pv4.fl');
                    //ASOCIAMOS EVENTOS FACTURA.
                    eventFormFactura();
                }
            });

            $.ajax({
                url: urlFormularioSuccess,
                crossDomain: true,
                type: 'GET',
                dataType: 'html',
                success: function (response) {
                    var html = $.parseHTML(response);
                    var result = $(html).filter('.divFormCompraFactura-success');
                    $(result).insertAfter('.w-100.pv4.fl');
                    htmlSuccess = result;
                }
            });

        }
    }, 1000);
}


function eventFormFactura() {

    $("#txtRut").blur(function () { isFormatValidRut(this); return false; });

    $("#btnFacturaOrden").click(function () {
        saveFacturaOrden();
        return false;
    });

    $("#btnLimpiar").click(function () {
        $("#divFormCompraFactura").find(':text, select').each(function (index) {
            $(this).val('');
            $(this).attr("readonly", false);
        });

        return false;
    });


    $.ajax({
        type: "GET",
        dataType: 'json',
        url: urlVtexMasterSearch.replace('{0}', emailContacto),
        success: function (data) {
            if (data.length > 0) {
                entity.PFAC_NROPEDIDO = transactionId;
                entity.PFAC_COMUNA = data[data.length - 1].PFAC_COMUNA;
                entity.PFAC_DEPTO = data[data.length - 1].PFAC_DEPTO;
                entity.PFAC_DIG = data[data.length - 1].PFAC_DIG;
                entity.PFAC_DIRECCION = data[data.length - 1].PFAC_DIRECCION;
                entity.PFAC_GIRO = data[data.length - 1].PFAC_GIRO;
                entity.PFAC_EMAIL = data[data.length - 1].PFAC_EMAIL;
                entity.PFAC_NUMERO = data[data.length - 1].PFAC_NUMERO;
                entity.PFAC_RAZONSOCIAL = data[data.length - 1].PFAC_RAZONSOCIAL;
                entity.PFAC_REGION = data[data.length - 1].PFAC_REGION;
                entity.PFAC_RUT = data[data.length - 1].PFAC_RUT;
                entity.PFAC_TELEFONO1 = data[data.length - 1].PFAC_TELEFONO1;
                entity.PFAC_TELEFONO2 = data[data.length - 1].PFAC_TELEFONO2;
                entity.PFAC_NOMBREFANTASIA = data[data.length - 1].PFAC_NOMBREFANTASIA;
                entity.PFAC_NOMBRECONTACTO = data[data.length - 1].PFAC_NOMBRECONTACTO;
                loadInfo();
            }
            else {
                entity.PFAC_EMAIL = emailContacto;
                entity.PFAC_NROPEDIDO = transactionId;
                $("#txtEmailContacto").val(emailContacto);
            }

            setMaxLenght();
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function setMaxLenght() {
    $("#txtRut").attr("maxlength", "13");
    $("#txtRazonSocial").attr("maxlength", "50");
    $("#txtGiro").attr("maxlength", "50");
    $("#txtNombreFantasia").attr("maxlength", "50");
    $("#txtDireccion").attr("maxlength", "80");
    $("#txtNumero").attr("maxlength", "20");
    $("#txtTelefono").attr("maxlength", "12");
    $("#txtEmailContacto").attr("maxlength", "50");
}

function saveFacturaOrden() {
    if (isValidForm() && setInfo()) {
        $.ajax({
            accept: 'application/vnd.vtex.ds.v10+json',
            contentType: 'application/json; charset=utf-8',
            crossDomain: true,
            type: "POST",
            url: urlVtexMaster,
            data: JSON.stringify(entity),
            success: function (response) {
                console.log(response);
                entity.id = response.Id;

                $("#divFormCompraFactura").html(htmlSuccess);

            }
        });
    }
}

function loadInfo() {
    $("#txtRut").val(entity.PFAC_RUT + '-' + entity.PFAC_DIG);
    $("#txtRazonSocial").val(entity.PFAC_RAZONSOCIAL);

    $("#txtDireccion").val(entity.PFAC_DIRECCION);
    $("#txtNumero").val(entity.PFAC_NUMERO);
    $("#txtNumeroDepto").val(entity.PFAC_DEPTO);
    $("#txtRegion").val(entity.PFAC_REGION);
    $("#txtComuna").val(entity.PFAC_COMUNA);

    $("#txtEmailContacto").val(entity.PFAC_EMAIL);
    $("#txtTelefono").val(entity.PFAC_TELEFONO1);

    $("#txtRut").attr('readonly', true);
    $("#txtEmailContacto").attr('readonly', true);
    $("#txtRazonSocial").attr('readonly', true);
}

function setInfo() {
    entity.PFAC_RUT = $("#txtRut").val().split('-')[0];
    entity.PFAC_DIG = $("#txtRut").val().split('-')[1];
    entity.PFAC_RAZONSOCIAL = $("#txtRazonSocial").val();

    entity.PFAC_DIRECCION = $("#txtDireccion").val();
    entity.PFAC_NUMERO = $("#txtNumero").val();
    entity.PFAC_DEPTO = $("#txtNumeroDepto").val();
    entity.PFAC_REGION = $("#txtRegion").val();
    entity.PFAC_COMUNA = $("#txtComuna").val();

    entity.PFAC_EMAIL = $("#txtEmailContacto").val();
    entity.PFAC_TELEFONO1 = $("#txtTelefono").val();

    return true;
}

function isValidForm() {
    var isValid = true;
    $("#formCompraFactura").find(":text, select").each(function (index) {
        var idError = $(this).attr('id').replace('txt', '#spnError').replace('cmb', '#spnError');


        if ($(idError).length != 0) {
            if ($(this).val() == '' || $(this).val() == undefined) {
                $(idError).text('El campo es obligatorio.');
                isValid = false;
            }
            else {
                $(idError).text('');
            }
        }
    });


    var regExp_Mail = new RegExp(/^[a-z]+[a-z0-9\.\-\_]*@[a-z]+[a-z0-9\.]*\.[a-z]{2,3}$/i);
    var regExp_Telefono = new RegExp(/^[+0-9]{8,12}$/i);

    isFormatValidRut($("#txtRut"));

    if (!regExp_Mail.test($("#txtEmailContacto").val())) {
        isValid = false;
        $("#spnErrorEmail").text('El email no es valido.');
    }
    else {
        $("#spnErrorEmail").text('');
    }
    if (!regExp_Telefono.test($("#txtTelefono").val())) {
        isValid = false;
        $("#spnErrorTelefono").text('El teléfono no es valido.');
    }
    else {
        $("#spnErrorTelefono").text('');
    }

    return isValid;
}

function isFormatValidRut(control) {
    $("#spnErrorRut").text('');

    var value = $(control).val();
    if (value != '') {
        if (value.length > 13) {
            $("#spnErrorRut").text('El campo supera el largo permitido. (max 13).');
        }
    }
    else
        $("#spnErrorRut").text('El campo es obligatorio.');
}


// -------------------------------- FIN FACTURA -----------------------------------------

