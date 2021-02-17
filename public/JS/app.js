const fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const Forecasts = document.querySelector('.Forecast');

const Temperature = document.querySelector('.Temperature span');

const LocationA = document.querySelector('.Location');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    LocationA.textContent = "Loading...";
    Temperature.textContent = "";
    Forecasts.textContent = "";
    const locationApi = "http://localhost:3000" + fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                LocationA.textContent = data.error;
                Temperature.textContent = "";
                Forecasts.textContent = "";
            } else {
                // console.log()
                // if(data.description === "rain" || data.description === "fog") {
                //     weatherIcon.className = "wi wi-day-" + data.description
                // } else {
                //     weatherIcon.className = "wi wi-day-cloudy"
                // }
                LocationA.textContent = data.Location;
                Forecasts.textContent = data.Forecast;
                Temperature.textContent = data.Temperature + '°C';
            }
        }) 
    });
})