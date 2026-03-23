const apiKey = "23266e9ce94327de6f465f31f8d930b3";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const historyDiv = document.getElementById("history");


searchBtn.addEventListener("click", handleSearch);

function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Enter city name");
    return;
  }

  fetchWeather(city);
}


function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  weatherInfo.innerHTML = "<p>Loading...</p>";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      saveHistory(city);
    })
    .catch(() => {
      weatherInfo.innerHTML =
        "<p style='color:red'>City not found</p>";
    });
}


function displayWeather(data) {
  weatherInfo.innerHTML = `
    <p><b>City</b> : ${data.name}</p>
    <p><b>Temp</b> : ${data.main.temp} °C</p>
    <p><b>Weather</b> : ${data.weather[0].main}</p>
    <p><b>Humidity</b> : ${data.main.humidity}%</p>
    <p><b>Wind</b> : ${data.wind.speed} m/s</p>
  `;
}


function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("cities")) || [];

  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("cities", JSON.stringify(history));
  }

  loadHistory();
}

function loadHistory() {
  historyDiv.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("cities")) || [];

  history.forEach((city) => {
    const btn = document.createElement("span");
    btn.textContent = city;
    btn.style.cursor = "pointer";
    btn.style.margin = "5px";

    btn.addEventListener("click", () => fetchWeather(city));

    historyDiv.appendChild(btn);
  });
}


window.onload = loadHistory;