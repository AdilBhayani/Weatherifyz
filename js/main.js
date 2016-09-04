var pageheader = document.getElementById('page-header');
var GoBtn = document.getElementById('GoBtn');
var city;
var inputCity;
var initialContainer = document.getElementById('initial-container');
var mainContainer = document.getElementById('main-container');
var data = document.getElementById('data');
var temperature;
var humidity;
var windSpeed;
var windDirection;
var overallWeather;
GoBtn.addEventListener("click", function () {
    inputCity = document.getElementById('InputCity');
    if (inputCity.value.length != 0) {
        city = inputCity.value;
    }
    else {
        city = "Auckland";
    }
    initialContainer.style.display = "none";
    pageheader.innerHTML = "Please wait while we analyse " + city + "'s weather!";
    weatherCaller(infoAnalyser, UIUpdater);
});
function UIUpdater() {
    pageheader.innerHTML = "Loaded " + city + "'s weather!";
    data.innerHTML = "Current temperature is " + temperature + " C";
}
function infoAnalyser(mainInfo, callback) {
    city = mainInfo.name;
    overallWeather = mainInfo.weather;
    temperature = Math.round((mainInfo.main.temp - 273.15) * 10) / 10; //Convert to Degrees C
    humidity = mainInfo.main.humidity;
    windAnalyser(mainInfo);
    callback(); //Call UIUpdater()
}
function windAnalyser(MainInfo) {
    windSpeed = MainInfo.wind.speed * 3.6;
    if (MainInfo.wind.direction > 270) {
        windDirection = "NW";
    }
    else if (MainInfo.wind.direction > 180) {
        windDirection = "SW";
    }
    else if (MainInfo.wind.direction > 90) {
        windDirection = "SE";
    }
    else {
        windDirection = "NE";
    }
}
function weatherCaller(callback, callback2) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=882bce37c2eef66ae6899d3a6e46b129",
        type: "POST",
        processData: false
    })
        .done(function (data) {
        if (data.cod != 404) {
            // Get the temperature
            var mainInfo = data;
            callback(mainInfo, callback2);
        }
        else {
            pageheader.innerHTML = "Can't find info about that city"; //Need to fix
        }
    })
        .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong.Try again later";
        console.log(error.getAllResponseHeaders());
    });
}
