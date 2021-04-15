
var ApiKey = "INSERT_API_KEY"; //replace "INSERT_API_KEY" with your own OpenWeatherMap API key

function getWeatherWithCityName() {
    var city = $('#city-name-input').val();
    var queryString =
        'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + ApiKey + '&units=metric&lang=en';
    $.getJSON(queryString, function (data) {
        showWeatherData(data);
    }).fail(function (jqXHR) {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').html("<p>Error retrieving data.[1] " + jqXHR.statusText + "</p>"
            + "<button class='refresh-btn' onClick='window.location.reload();'>Refresh</button>");
    });
    return false;
}

function getWeatherWithGeoLocation() {
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
        { timeout: 8000, enableHighAccuracy: true });

    $('#error-msg').show();
    $('#error-msg').text('Determining current location ...');
}

function onGetLocationSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var queryString = 'http://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + ApiKey + '&units=metric&lang=en';

    $.getJSON(queryString, function (data) {
        showWeatherData(data);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').html("<p>Error retrieving data.[2] " + jqXHR.statusText + "</p>"
            + "<button onClick='window.location.reload();'>Refresh</button>");
    });
}

function onGetLocationError(error) {
    $('#error-msg').html("<p>Unable to retrieve location. Check your connection and turn on the location of the device.</p>"
        + "<button onClick='window.location.reload();'>Refresh</button>");
}

function showWeatherData(data) {

    if (data.weather != undefined) {
        $('#error-msg').hide();
        $('#weather-data').show();

        //icons from the 'icons' map
        $('#icon').html("<img src='icons/" + data.weather[0].icon + ".png' alt=''>");

        //OpenWeatherMap icons
        //$('#icon').html("<img src='http://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt=''>");

        var temp = Math.ceil(data.main.temp);
        $('#temperature').text(temp + "°C");

        $('#city-name').text(data.name + ", " + data.sys.country);
        $('#description').text(data.weather[0].description);

        $('#pressure').text(data.main.pressure + " hPa");
        $('#humidity').text(data.main.humidity + "%");

        var windSpeed = data.wind.speed;
        $('#wind').text(Math.ceil(windSpeed * 3.6) + " km/h");

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').html("<p>Error retrieving data.[3] " + jqXHR.statusText + "</p>"
            + "<button onClick='window.location.reload();'>Refresh</button>");
    }
}

setTimeout(function () {
    location.reload();
}, 120000);
