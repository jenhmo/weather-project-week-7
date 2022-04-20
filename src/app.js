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

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

search("Vienna");