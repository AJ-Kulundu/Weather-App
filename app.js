//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const descElement = document.querySelector(".temperature-description p");
const tempElement = document.querySelector(".temperature-value p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data

const weather = { };

weather.temperature = {
    unit :"celcius"
}

//App consts and vars

const KELVIN = 273;

//API Key
const key ="" ;

//Geolocation inquiry

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);

}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p> Geolocation Unknown<p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
// Show error when there is an 
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML =`<p> ${error.message} </p>`;
}

//get Weather function
function getWeather(latitude,longitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });

}

//display weather to UI
function displayWeather(){
   iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
   tempElement.innerHTML = `${weather.temperature.value}◦<span>C</span> `;
    descElement.innerHTML =weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`; 
}
// c to F
function celciusToFarenheit(){
    return(temperature * 9/5) +32;
}

//eventlistener
tempElement.addEventListener("onClick", function(){
    if(weather.temperature.value === undefined)return;

    if (weather.temperature.unit =="celsius"){
        let farenheit = celciusToFarenheit(weather.temperature.value);
        farenheit = Math.floor(farenheit);
         
        tempElement.innerHTML = `${farenheit}◦<span>F</span> `;
        weather.temperature.unit = "farenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}◦<span>C</span> `;
        weather.temperature.unit = "celsius";
    }
});
