function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function displayForecast(){
    let forecastElement = document.querySelector(`#weather-forecast`);
    let forecastHTML = `<div class="row">`; 
    let days = ["Wed", "Thu" ,"Fri", "Sat", "Sun"];
    days.forEach(function(day) {
      forecastHTML = 
      forecastHTML + 
      `<div class="col-2">
          <div class="weather-forecast-date">
          ${day}
      </div>
          <img src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" alt="" width="40" />
         <div class="weather-forecast-temperatures"> 
             <span class="weather-forecast-temperatures-max">
                 18˚
             </span> 
             <span class="weather-forecast-temperatures-min"> 
                 12˚
               </span>
           </div>
      </div>`;
    });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
  }

function displayTemp(response){
    temperatureCelsius = response.data.main.temp;

    let temperatureElement = document.querySelector(`#temperature`);
    temperatureElement.innerHTML = Math.round(temperatureCelsius);

    let dateElement = document.querySelector(`#date`);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let cityElement = document.querySelector(`#city`);
    cityElement.innerHTML = response.data.name; 

    let descriptionElement = document.querySelector(`#description`);
    descriptionElement.innerHTML = response.data.weather[0].description;

    let humidityElement = document.querySelector(`#humidity`);
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector(`#wind`);
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let iconElement = document.querySelector(`#icon`);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
  };

function search(city){
let apiKey = "a4dfa5a448f82badff3625201cc77dc9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector(`#city-input`);
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemperature = (temperatureCelsius * 9 ) / 5 +32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
 event.preventDefault();
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");
 let temperatureElement = document.querySelector(`#temperature`);
 temperatureElement.innerHTML = Math.round(temperatureCelsius);
}

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

search("Vienna");
displayForecast();

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", displayCelsiusTemperature);