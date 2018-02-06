var map = null;
var infoWindow = null;
var markers = [];
var $el = $(".nuestras-tiendas__container");

if ($el.length) {

    // var $pais = $("#pais option:eq(1):contains('Argentina')");

    window.onload = loadScript;

    setInterval(function () {

        // $('#pais').change();

        $('#bodyContent p').each(function () {

            var $this = $(this);

            $this.text($this.text().replace(/_/g, ' '));
        });

        // $('.tiendas .resultado .tiendas-resultado, .tiendas .resultado .tiendas-info').css("display","block");

    }, 1000);

}

function loadScript() {

    /* colorear cuadro */
    var color = $(".produto .dimension-Color").text();
    var script = document.createElement('script');
    var pais = '';

    $(".produto .dimension-Color").css("color", "#" + color);
    $(".produto .dimension-Color").css("background", "#" + color);

    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDzzSgYRacD6Rzn9EmHMPGD3gdZljh0tpk&sensor=false' + '&callback=initialize';
    document.body.appendChild(script);

    deleteGoogleMapMessage();
    getStores();

    $(".stores_ul ul li").on('click', function () {

        var store_name = $(this).attr('id');
        var attributes = $(this).attr('rel');
        setStoreMap(store_name, attributes);
        $(".stores_ul ul li").removeClass('selected');
        $(this).addClass('selected');

    });

    $('#pais').on('change', function () {
        pais = $(this).val();
        // getMarkersByCountry(pais);
        getCities(pais);
    });

    $('#ciudad').on('change', function () {

        var ciud = $(this).val();
        addMarkersOfCity(ciud, pais, map);
        $('.ciudad').hide();

        // Se muestran los options de las tiendas a partir de la ciudad actual se utiliza la clase
        if (ciud.indexOf(' ') >= 0) {

        } else {

        }
        $('.' + ciud.replace(" ", "")).show();

    });
}

function initialize() {

    map = initializeMap();
    deleteGoogleMapMessage();
    deleteMarkers();

    ciudad = getParametroUrl("ciudad");
    pais = getParametroUrl("pais");
    markerFound = false;

    if (ciudad != "" && (pais == null || pais == "")) {

        // Solo para Argentina se envia como parametro la ciudad
        markerFound = addMarkersOfCity(ciudad, "Argentina", map);

    } else if (ciudad != null && ciudad != "" && pais != null && pais != "") {

        // Solo para Argentina se envia como parametro la ciudad
        markerFound = addMarkersOfCity(ciudad, pais, map);

    } else if (pais != "" && (ciudad == null || ciudad == "")) {

        // Se ubican las tiendas del pais
        markerFound = getMarkersByCountry(pais);

    }

    if (!markerFound) {

        // Por defecto se ubican las tiendas de Argentina
        getMarkersByCountry("Argentina");

    }

    google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
        deleteGoogleMapMessage();
    });

    google.maps.event.addListenerOnce(map, 'idle', function () {
        deleteGoogleMapMessage();
    });

}

function deleteGoogleMapMessage() {

    firstGmnoPrint = $(".gmnoprint").first();
    nextfirstGmnoPrint = firstGmnoPrint.next();
    nextfirstGmnoPrint.remove();

}

function getParametroUrl(paramName) {

    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var href = window.location.href;
    href = href.replace(/&amp;/g, '&');
    var results = regex.exec(href);

    if (results == null) {

        return "";
    } else {

        return decodeURIComponent(results[1]);

    }

}

function initializeMap() {

    var mapOptions = {

        center: new google.maps.LatLng(-22.913885, -43.7261816),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    return map;

}

function getAutoCompleteValues() {

    data = getAllData();
    values = [];

    $.each(data, function (countryName, countryVal) {

        countryObj = new Object();
        countryObj["id"] = countryName;
        countryObjValue = new Object();
        countryObjValue["type"] = "Country";
        countryObjValue["country"] = countryName;
        countryObj["value"] = countryObjValue;
        countryObj["label"] = countryName;
        values.push(countryObj);

        $.each(countryVal.cities, function (cityName, cityVal) {

            cityObj = new Object();
            cityObj["id"] = cityName + ", " + countryName;
            cityObjValue = new Object();
            cityObjValue["type"] = "City";
            cityObjValue["country"] = countryName;
            cityObjValue["city"] = cityName;
            cityObj["value"] = cityObjValue;
            cityObj["label"] = cityName + ", " + countryName;

            values.push(cityObj);

            $.each(cityVal.stores, function (storeName, storeVal) {
                storeObj = new Object();
                storeObj["id"] = storeName;
                storeObjValue = new Object();
                storeObjValue["type"] = "Store";
                storeObjValue["country"] = countryName;
                storeObjValue["city"] = cityName;
                storeObj["value"] = storeObjValue;
                storeObj["label"] = storeName;

                values.push(storeObj);

            });

        });

    });

    return values;

}

/* test */

function getStores() {

    data = getAllData();
    values = [];
    var UL = $('<ul/>');
    // var opt = $('<option>').val('Seleccione su país').text('Seleccione su país');
    // $('#pais').append(opt);

    $.each(data, function (countryName, countryVal) {

        var opt2 = $('<option>').val(countryName).text(countryName);
        $('#pais').append(opt2);

        $.each(countryVal.cities, function (cityName, cityVal) {

            $.each(cityVal.stores, function (storeName, storeVal) {

                storeObj = new Object();
                storeObj["id"] = storeName;
                storeObjValue = new Object();
                storeObjValue["type"] = "Store";
                storeObjValue["country"] = countryName;
                storeObjValue["city"] = cityName;
                storeObj["value"] = storeObjValue;
                storeObj["label"] = storeName;

                values.push(storeObj);
                var LI = $('<li/>').text(storeName).attr('id', storeName).attr('rel', cityName + ',' + countryName).addClass(cityName).addClass('ciudad');
                UL.append(LI);

            });

        });

    });

    $(".stores_ul").append(UL);
    //console.log(values);
}

function getCities(pais) {

    data = getAllData();
    values = [];
    var UL = $('<ul/>');

    $.each(data, function (countryName, countryVal) {

        $.each(countryVal.cities, function (cityName, cityVal) {

            if (countryName == pais) {
                values.push(cityName);
            }

        });

    });

    $('#ciudad').html('');

    var opt = $('<option>').val('Seleccione Cuidad').text('Seleccione Cuidad');

    $('#ciudad').append(opt);

    $.each(values, function (index, value) {

        var opt2 = $('<option>').val(value).text(value);
        $('#ciudad').append(opt2);

    });

}

function setStoreMap(store, atrtibutes) {

    data = atrtibutes.split(',');
    city = data[0];
    country = data[1];
    addMarkersOfStore(store, city, country, map);

}

function getMarkersByCountry(country) {

    data = getAllData();
    objCountry = data[country];
    if (objCountry != null) {

        $.each(objCountry.cities, function (cityName, city) {

            $.each(city.stores, function (storeName, store) {

                latLng = new google.maps.LatLng(store.lat, store.lng),
                title = storeName;
                var marker = addMarker(latLng, title, map);

                google.maps.event.addListener(marker, 'click', function () {

                    map.setCenter(latLng);

                    if (infoWindow) {

                        infoWindow.close();
                        infoWindow = null;
                    }

                    infoWindow = new google.maps.InfoWindow({

                        content: getContentString(store, storeName, cityName, country)
                    });

                    infoWindow.open(map, marker);
                    setSelectedStore(store, storeName, cityName, country);

                });

            });

        });

        countryLatLng = new google.maps.LatLng(objCountry.lat, objCountry.lng);
        map.setCenter(countryLatLng);
        map.setZoom(5);
        return true;
    } else {

        return false;

    }

}

function addMarkersOfCity(cityName, country, map) {

    clearSelectedStore();
    data = getAllData();
    city = data[country].cities[cityName];
    if (city != null) {

        // Se recorren todas las tiendas de la ciudad
        $.each(city.stores, function (storeName, store) {

            latLng = new google.maps.LatLng(store.lat, store.lng),
                title = storeName;
            var marker = addMarker(latLng, title, map);

            google.maps.event.addListener(marker, 'click', function () {

                map.setCenter(latLng);

                if (infoWindow) {

                    infoWindow.close();
                    infoWindow = null;
                }

                infoWindow = new google.maps.InfoWindow({

                    content: getContentString(store, storeName, cityName, country)

                });

                infoWindow.open(map, marker);
                setSelectedStore(store, storeName, cityName, country);

            });

        });

        // Se fija el centro en la ciudad y se hace un zoom menos profundo
        //cityLatLng = getCityLocation( cityName, country, cityLocationCallBack );
        cityLatLng = new google.maps.LatLng(city.lat, city.lng);
        map.setCenter(cityLatLng);
        map.setZoom(12);

        return true;
    } else {

        return false;

    }

}

function cityLocationCallBack(location) {
    return location;
}

function addMarkersOfStore(store, city, country, map) {

    data = getAllData();
    stores = data[country].cities[city].stores;
    storeObj = stores[store];
    latLng = new google.maps.LatLng(storeObj.lat, storeObj.lng),
        title = store;
    marker = addMarker(latLng, title, map);
    map.setCenter(latLng);
    map.setZoom(16);
    setSelectedStore(storeObj, title, city, country);

    google.maps.event.addListener(marker, 'click', function () {

        map.setCenter(latLng);

        if (infoWindow) {

            infoWindow.close();
            infoWindow = null;

        }

        infoWindow = new google.maps.InfoWindow({

            content: getContentString(storeObj, title, city, country)

        });

        infoWindow.open(map, marker);
        setSelectedStore(storeObj, title, city, country);

    });

}

function getContentString(store, storeName, city, country) {

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">' + storeName + '</h2>' +
        '<div id="bodyContent">' +
        '<div class="bodyContent__text"><strong>Ciudad: </strong> <p> ' + city + '</p></div>' +
        '<div class="bodyContent__text"><strong>Pais: </strong> <p>' + country + '</p></div>' +
        (store.address != null && $.trim(store.address) != "" ?
            '<div class="bodyContent__text"><strong>Dirección: </strong><p>' + store.address + '</p></div>' :
            '') +

        (store.phone != null && $.trim(store.phone) != "" ?
            '<div class="bodyContent__text"><strong>Teléfono: </strong><p>' + store.phone + '</p></div>' :
            '') +
        (store.schedules != null && $.trim(store.schedules) != "" ?
            '<div class="bodyContent__text"><strong>Horários: </strong><p>' + store.schedules + '</p></div>' :
            '') +
        '</div>' +
        '</div>';

    return contentString;

}

function clearSelectedStore() {

    $("#storeContent").empty();

}

function setSelectedStore(store, storeName, city, country) {

    contentString = getContentString(store, storeName, city, country);
    $("#storeContent").empty();
    $("#storeContent").append(contentString);

}

function markerImage() {

    return "/arquivos/pin-in-the-map.png";

}

// Add a marker to the map and push to the array.
function addMarker(latLng, title, map) {

    var marker = new google.maps.Marker({

        position: latLng,
        map: map,
        title: title
        // icon :  markerImage()

    });

    markers.push(marker);
    return marker;
}

// Sets the map on all markers in the array.
function setAllMap(map) {

    for (var i = 0; i < markers.length; i++) {

        markers[i].setMap(map);

    }

}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {

    setAllMap(null);

}

// Shows any markers currently in the array.
function showMarkers() {

    setAllMap(map);

}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {

    clearMarkers();
    markers = [];

}


function getAllData() {

    var data = {

        // pais

        Argentina: {

            lat: -37.0560032,
            lng: -81.6327078,
            // ciudades

            cities: {

                BUENOS_AIRES: {

                    lat: "-34.6158037",
                    lng: "-58.5033388",

                    stores: {

                        "SAMSONITE OUTLET": {

                            lat: -34.563503,
                            lng: -58.4572677,
                            personal: "",
                            address: "Av. Cabildo 1925, CABA.",
                            phone: "4511-2727",
                            fax: "",
                            email: "cabildo1925travelcba@gmail.com"

                        },

                        "SAMSONITE OUTLET CABA": {

                            lat: -34.5965406,
                            lng: -58.4273215,
                            personal: "",
                            address: "Av. Cordoba 4261, CABA.",
                            phone: "4867-4519/4364",
                            fax: "",
                            email: "samsonite.Cordoba@gmail.com"

                        },

                        "SAMSONITE OUTLET ARCOS": {

                            lat: -34.5800186,
                            lng: -58.4287099,
                            personal: "",
                            address: "Shopping Distrito Arcos - Paraguay 4979, Loc. 63b, CABA.",
                            phone: "5789-2797",
                            fax: "",
                            email: "arcos.samsonite@gmail.com"

                        },

                        "PATIO BULLRICH": {

                            lat: -34.5900954,
                            lng: -58.385876,
                            personal: "",
                            address: "Posadas 1245 - Loc. 2036, CABA.",
                            phone: "4814-7497",
                            fax: "",
                            email: "samsonitebullrich@gmail.com"

                        },

                        "DOT BAIRES SHOPPING": {

                            lat: -34.5457365,
                            lng: -58.4905292,
                            personal: "",
                            address: "Vedia 3626 - Loc. 162, CABA.",
                            phone: "5777-9662",
                            fax: "",
                            email: "samsonite.dot@gmail.com"

                        },

                        "ALCORTA SHOPPING": {

                            lat: -34.5750731,
                            lng: -58.4077686,
                            personal: "",
                            address: "J. Salguero 3172 - Loc. 3060, CABA.",
                            phone: "4807-7877",
                            fax: "",
                            email: "alcorta@travelcba.com"

                        },

                        "ALTO PALERMO SHOPPING": {

                            lat: -34.5883312,
                            lng: -58.4128553,
                            personal: "",
                            address: "Av. Santa Fe 3253 - Loc. 1003.",
                            phone: "5777-8336",
                            fax: "",
                            email: "altopalermo@travelcba.com"

                        }

                    }

                },


            } // /.fin ciudades

        } // /.fin pais 

    };

    return data;

}