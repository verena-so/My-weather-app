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
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#weather-wind");
  let windOutput = response.data.wind.speed;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;

  let weatherConditionBackground = response.data.condition.icon;
  let backgroundElement = document.querySelector("body");

  if (weatherConditionBackground === "clear-sky-day") {
    backgroundElement.classList.remove(
      "cloudy",
      "rainy",
      "thunderstorm",
      "snow",
      "mist",
      "night"
    );
    backgroundElement.classList.add("sunny");
  } else if (
    weatherConditionBackground === "few-clouds-day" ||
    weatherConditionBackground === "scattered-clouds-day" ||
    weatherConditionBackground === "broken-clouds-day"
  ) {
    backgroundElement.classList.remove(
      "sunny",
      "rainy",
      "thunderstorm",
      "snow",
      "mist",
      "night"
    );
    backgroundElement.classList.add("cloudy");
  } else if (
    weatherConditionBackground === "shower-rain-day" ||
    weatherConditionBackground === "rain-day"
  ) {
    backgroundElement.classList.remove(
      "sunny",
      "cloudy",
      "rainy",
      "thunderstorm",
      "snow",
      "mist",
      "night"
    );
    backgroundElement.classList.add("rainy");
  } else if (weatherConditionBackground === "thunderstorm-day") {
    backgroundElement.classList.remove(
      "sunny",
      "cloudy",
      "rainy",
      "snow",
      "mist",
      "night"
    );
    backgroundElement.classList.add("thunderstorm");
  } else if (weatherConditionBackground === "snow-day") {
    backgroundElement.classList.remove(
      "sunny",
      "cloudy",
      "rainy",
      "thunderstorm",
      "mist",
      "night"
    );
    backgroundElement.classList.add("snow");
  } else if (weatherConditionBackground === "mist-day") {
    backgroundElement.classList.remove(
      "sunny",
      "cloudy",
      "rainy",
      "thunderstorm",
      "snow",
      "night"
    );
    backgroundElement.classList.add("mist");
  } else if (
    weatherConditionBackground === "clear-sky-night" ||
    weatherConditionBackground === "few-clouds-night" ||
    weatherConditionBackground === "scattered-clouds-night" ||
    weatherConditionBackground === "broken-clouds-night" ||
    weatherConditionBackground === "shower-rain-night" ||
    weatherConditionBackground === "rain-night" ||
    weatherConditionBackground === "thunderstorm-night" ||
    weatherConditionBackground === "snow-night" ||
    weatherConditionBackground === "mist-night"
  ) {
    backgroundElement.classList.remove(
      "sunny",
      "cloudy",
      "rainy",
      "thunderstorm",
      "snow",
      "mist"
    );
    backgroundElement.classList.add("night");
  }

  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKey = "57eafdf333f32b7f37o90e19f0tdeb44";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric;`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">☀️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>18°</strong>
              </div>
              <div class="weather-forecast-temperature">12°</div>
            </div>
          </div>
        </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Vienna");
