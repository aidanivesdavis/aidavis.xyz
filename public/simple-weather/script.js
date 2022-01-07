let getForecastButton = document.getElementById('getForecastButton');
let forecastDisplay = document.getElementById('forecastDisplay');
let latField = document.getElementById('latitudeField');
let lonField = document.getElementById('longitudeField');
let cityField = document.getElementById('cityField');
let regionField = document.getElementById('regionField');
let countryField = document.getElementById('countryField');

getForecast('ip');

getForecastButton.addEventListener('click', () => {
    forecastDisplay.innerText = '';

    let locationPath;
    if (coordinatesAreValid(latField.value, lonField.value)) {
        let lat = Math.trunc(Number(latField.value) * 100) / 100;
        let lon = Math.trunc(Number(lonField.value) * 100) / 100;
        locationPath = 'address/' + lat + ',' + lon;
    } else if (cityField.value !== '') {
        locationPath = 'address/' + 
            [cityField.value, regionField.value, countryField.value]
                .map(field => field.replace(/\s/g, ''))
                .filter(field => field !== '')
                .join(',');
    } else {
        forecastDisplay.innerText = 'Enter a city or the coordinates.';
        return;
    }

    getForecast(locationPath);
});

function coordinatesAreValid(latStr, lonStr) {
    if (latStr === '' || lonStr === '') {
        return false;
    }

    let lat = Number(latStr);
    let lon = Number(lonStr);
    if (lat === NaN || lon === NaN) {
        return false;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return false;
    }

    return true;
}

function getForecast(locationPath) {
    fetch('http://aidavis.xyz/simple-weather/getForecast/' + locationPath)
        .then(res => res.json())
        .then(message => {
            forecastDisplay.innerText = message.location.name +
                ' ' +
                message.forecast.forecastday[0].day.maxtemp_f;
        });
}