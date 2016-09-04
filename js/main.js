var pageheader = document.getElementById('page-header');
var GoBtn = document.getElementById('GoBtn');
var BackBtnClass = document.getElementsByClassName('BackBtn');
var OptionBtnClass = document.getElementsByClassName('OptionBtns');
var CurrentCityBtn = document.getElementById('CurrentCityBtn');
var ForecastBtn = document.getElementById('ForecastBtn');
var city;
var inputCity;
var initialContainer = document.getElementById('initial-container');
var forecastContainer = document.getElementById('forecast-container');
var currentWeather = document.getElementById('current-weather-container');
var temperatureOut = document.getElementById('temperature');
var humidityOut = document.getElementById('humidity');
var WindOut = document.getElementById('wind');
var overallWeatherOut = document.getElementById('overall');
var generalIcon = document.getElementById("icon");
var countryOut = document.getElementById("countryCode");
var temperature;
var humidity;
var windSpeed;
var windDirection;
var overallWeather;
var country;
var CurrentMenu = initialContainer;
var menuOption = 0;
var futureTemperature = [];
var futureHumidity = [];
var futureWindSpeed = [];
var futureWindDirection = [];
var futureOverall = [];
//Either pressing go button or enter will cause api call to be made and UI to update
GoBtn.addEventListener("click", function () {
    Go(menuOption);
});
$(".form-control").keyup(function (e) {
    if (e.keyCode == 13) {
        Go(menuOption);
    }
});
//Back button takes user back to initial UI
for (var i = 0; i < BackBtnClass.length; i++) {
    BackBtnClass[i].addEventListener("click", function () {
        ClearAllMenus();
        ButtonsClear();
        initialContainer.style.display = "block";
        pageheader.innerHTML = "Your go-to Weather Analyser";
        document.getElementById('glasses').style.color = 'black';
    });
}
CurrentCityBtn.addEventListener("click", function () {
    initalReseter();
    menuOption = 0;
});
ForecastBtn.addEventListener("click", function () {
    initalReseter();
    menuOption = 1;
});
function initalReseter() {
    ClearAllMenus();
    ButtonsClear();
    initialContainer.style.display = "block";
    pageheader.innerHTML = "Your go-to Weather Analyser";
    document.getElementById('glasses').style.color = 'black';
}
function ClearAllMenus() {
    currentWeather.style.display = "none";
    initialContainer.style.display = "none";
    forecastContainer.style.display = "none";
}
function ButtonsClear() {
    $('.OptionBtns').click(function () {
        $('.OptionBtns').removeClass('btn-success').addClass('btn-primary ');
        $(this).addClass('btn-success').removeClass('btn-primary ');
    });
}
function Go(option) {
    inputCity = document.getElementById('InputCity');
    if (inputCity.value.length != 0) {
        city = inputCity.value;
    }
    else {
        city = "Auckland";
    }
    initialContainer.style.display = "none";
    pageheader.innerHTML = "Please wait while we analyse " + city + "'s weather!";
    weatherCaller(option, infoAnalyser, UIUpdater);
}
function currentCityUpdater() {
    countryOut.innerHTML = "Country: " + country;
    temperatureOut.innerHTML = "Current temperature is " + temperature + "\xB0 C";
    humidityOut.innerHTML = "Humidity is at " + humidity + "%";
    WindOut.innerHTML = "Wind at " + windSpeed + " Km/Hr from the " + windDirection;
    humidityOut.innerHTML = "Humidity is at " + humidity + "%";
    uppercaseOverallWeather(overallWeather);
    var iconLink = "http://openweathermap.org/img/w/" + overallWeather[0].icon + ".png";
    generalIcon.src = iconLink;
    generalIcon.style.cssText = "height: 36px; width: 36px; margin-left: 4px;";
    currentWeather.style.display = "block";
    document.getElementById('weather-info-box').style.display = 'block';
    document.getElementById('glasses').style.color = 'orange';
}
function forecastCityUpdater() {
    forecastContainer.style.display = "block";
    document.getElementById('weather-info-box').style.display = 'block';
    document.getElementById('glasses').style.color = 'orange';
    var time = new Date();
    var currentHour = time.getHours();
    if (currentHour > 0) {
        currentHour = Math.floor(currentHour / 3.0) * 3;
    }
    else {
        currentHour = 3;
    }
    for (var i = 0; i < 3; i++) {
        currentHour = (currentHour + 3) % 24;
        if (currentHour < 10) {
            document.getElementById("Time" + i).innerHTML = "0" + currentHour.toString() + ":00";
        }
        else {
            document.getElementById("Time" + i).innerHTML = currentHour.toString() + ":00";
        }
        document.getElementById('T' + i).innerHTML = futureTemperature[i] + "\xB0 C";
        document.getElementById('H' + i).innerHTML = futureHumidity[i] + "%";
        document.getElementById('W' + i).innerHTML = futureWindSpeed[i] + " Km/Hr " + futureWindDirection[i];
        futureOverall[i][0].description = futureOverall[i][0].description.charAt(0).toUpperCase() + futureOverall[i][0].description.slice(1); //Capitalize first letter of all 3 fields
        document.getElementById('G' + i).innerHTML = futureOverall[i][0].description;
        var iconLink = "http://openweathermap.org/img/w/" + futureOverall[i][0].icon + ".png";
        document.getElementById('I' + i).src = iconLink;
    }
}
function uppercaseOverallWeather(overallWeather) {
    overallWeather[0].description = overallWeather[0].description.charAt(0).toUpperCase() + overallWeather[0].description.slice(1); //Capitalize first letter
    overallWeatherOut.innerHTML = overallWeather[0].description;
}
function UIUpdater(option) {
    pageheader.innerHTML = "Loaded " + city + "'s weather!";
    if (option == 0) {
        currentCityUpdater();
    }
    else if (option == 1) {
        forecastCityUpdater();
    }
}
function infoAnalyser(option, mainInfo, callback) {
    if (option == 0) {
        city = mainInfo.name;
        overallWeather = mainInfo.weather;
        temperature = Math.round((mainInfo.main.temp - 273.15) * 10) / 10; //Convert to Degrees C
        humidity = mainInfo.main.humidity;
        windAnalyser(mainInfo, option, 0);
        country = mainInfo.sys.country;
    }
    else if (option == 1) {
        city = mainInfo.city.name;
        country = mainInfo.country;
        for (var i = 0; i < 3; i++) {
            futureTemperature[i] = Math.round((mainInfo.list[i].main.temp - 273.15) * 10) / 10; //Convert to Degrees C
            futureHumidity[i] = mainInfo.list[i].main.humidity;
            windAnalyser(mainInfo, option, i);
            futureOverall[i] = mainInfo.list[i].weather;
        }
    }
    callback(option); //Call UIUpdater()
}
function windAnalyser(MainInfo, option, i) {
    if (option == 0) {
        windSpeed = Math.round(MainInfo.wind.speed * 36) / 10;
        if (MainInfo.wind.deg > 348.75) {
            windDirection = "N";
        }
        else if (MainInfo.wind.deg > 326.25) {
            windDirection = "NNW";
        }
        else if (MainInfo.wind.deg > 303.75) {
            windDirection = "NW";
        }
        else if (MainInfo.wind.deg > 281.25) {
            windDirection = "WNW";
        }
        else if (MainInfo.wind.deg > 258.75) {
            windDirection = "W";
        }
        else if (MainInfo.wind.deg > 236.25) {
            windDirection = "WSW";
        }
        else if (MainInfo.wind.deg > 213.75) {
            windDirection = "SW";
        }
        else if (MainInfo.wind.deg > 191.25) {
            windDirection = "SSW";
        }
        else if (MainInfo.wind.deg > 168.75) {
            windDirection = "S";
        }
        else if (MainInfo.wind.deg > 146.25) {
            windDirection = "SSE";
        }
        else if (MainInfo.wind.deg > 123.75) {
            windDirection = "SE";
        }
        else if (MainInfo.wind.deg > 101.25) {
            windDirection = "ESE";
        }
        else if (MainInfo.wind.deg > 78.75) {
            windDirection = "E";
        }
        else if (MainInfo.wind.deg > 56.25) {
            windDirection = "ENE";
        }
        else if (MainInfo.wind.deg > 33.75) {
            windDirection = "NE";
        }
        else if (MainInfo.wind.deg > 11.25) {
            windDirection = "NNE";
        }
        else {
            windDirection = "N";
        }
    }
    else if (option == 1) {
        futureWindSpeed[i] = Math.round(MainInfo.list[i].wind.speed * 36) / 10;
        if (MainInfo.list[i].wind.deg > 348.75) {
            futureWindDirection[i] = "N";
        }
        else if (MainInfo.list[i].wind.deg > 326.25) {
            futureWindDirection[i] = "NNW";
        }
        else if (MainInfo.list[i].wind.deg > 303.75) {
            futureWindDirection[i] = "NW";
        }
        else if (MainInfo.list[i].wind.deg > 281.25) {
            futureWindDirection[i] = "WNW";
        }
        else if (MainInfo.list[i].wind.deg > 258.75) {
            futureWindDirection[i] = "W";
        }
        else if (MainInfo.list[i].wind.deg > 236.25) {
            futureWindDirection[i] = "WSW";
        }
        else if (MainInfo.list[i].wind.deg > 213.75) {
            futureWindDirection[i] = "SW";
        }
        else if (MainInfo.list[i].wind.deg > 191.25) {
            futureWindDirection[i] = "SSW";
        }
        else if (MainInfo.list[i].wind.deg > 168.75) {
            futureWindDirection[i] = "S";
        }
        else if (MainInfo.list[i].wind.deg > 146.25) {
            futureWindDirection[i] = "SSE";
        }
        else if (MainInfo.list[i].wind.deg > 123.75) {
            futureWindDirection[i] = "SE";
        }
        else if (MainInfo.list[i].wind.deg > 101.25) {
            futureWindDirection[i] = "ESE";
        }
        else if (MainInfo.list[i].wind.deg > 78.75) {
            futureWindDirection[i] = "E";
        }
        else if (MainInfo.list[i].wind.deg > 56.25) {
            futureWindDirection[i] = "ENE";
        }
        else if (MainInfo.list[i].wind.deg > 33.75) {
            futureWindDirection[i] = "NE";
        }
        else if (MainInfo.list[i].wind.deg > 11.25) {
            futureWindDirection[i] = "NNE";
        }
        else {
            futureWindDirection[i] = "N";
        }
    }
}
function weatherCaller(option, callback, callback2) {
    var callString;
    if (option == 0) {
        callString = "weather?q=" + city;
    }
    else if (option == 1) {
        callString = "forecast?q=" + city;
    }
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/" + callString + "&APPID=882bce37c2eef66ae6899d3a6e46b129",
        type: "POST",
        processData: false
    })
        .done(function (data) {
        if (data.cod != 404) {
            // Get the temperature
            var mainInfo = data;
            callback(option, mainInfo, callback2);
        }
        else {
            pageheader.innerHTML = "Can't find info about one or more cities";
            document.getElementById('weather-info-box').style.display = 'none';
            currentWeather.style.display = "block";
        }
    })
        .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong.Try again later";
        console.log(error.getAllResponseHeaders());
    });
}
function init() {
    ButtonsClear();
    $('#CurrentCityBtn').addClass('btn-success').removeClass('btn-primary ');
}
init();
