
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        getWeatherWithGeoLocation();

        $('#find-weather-btn').click(getWeatherWithCityName);

        $('#city-name-input').on("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $('#find-weather-btn').click(getWeatherWithCityName());
            }
        });

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

