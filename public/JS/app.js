const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const Forecasts = document.querySelector('.Forecast');

const Temperature = document.querySelector('.Temperature span');

const LocationA = document.querySelector('.Location');

const dateElement = document.querySelector('.dates');
const timeElement = document.querySelector('.time');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

timeElement.textContent = getTime();
dateElement.textContent = getDate();


function getDate() {
    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "-" + month + "-" + year;
}
function getTime(){
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    return hour + ":" + min;
}
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    LocationA.textContent = "Loading...";
    Temperature.textContent = "";
    Forecasts.textContent = "";
    fetch('/weather?address='+ location).then((response)=>{
        response.json().then(data => {
            if(data.error) {
                LocationA.textContent = data.error;
                Temperature.textContent = "";
                Forecasts.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                LocationA.textContent = data.Location;
                Forecasts.textContent = data.Forecast;
                Temperature.textContent = data.Temperature + '°C';
            }
        }); 
    });
});


    


