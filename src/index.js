function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureOutput = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperatureOutput);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#weather-condition");
  let conditionOutput = response.data.condition.description;
  conditionElement.innerHTML = conditionOutput;

  let humidityElement = document.querySelector("#weather-humidity");
  let humidityOutput = response.data.temperature.humidity;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;

  let windElement = document.querySelector("#weather-wind");
  let windOutput = response.data.wind.speed;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "57eafdf333f32b7f37o90e19f0tdeb44";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Vienna");
