"use strict";

const locationName = document.getElementById("location");
const searchBtn = document.getElementById("search");
const icon = document.getElementById("w-icon");
const temperature = document.getElementById("temperature");
const summary = document.getElementById("summary");
const feelsLike = document.getElementById("feels-like");

const currentPosition = function () {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      const para = [res.coords.latitude, res.coords.longitude];
      updateWeather(para);
    },
    (err) => {
      alert(
        "To view the current weather for your location, please enable location access on your device"
      );
      locationName.placeholder = "Type location here";
    }
  );
};

const updateWeather = async function (para) {
  let res;
  if (typeof para == "object") {
    const query = para.join(",");
    res = await getWeather(query);
  } else {
    res = await getWeather(para);
  }

  if (res.status === 200) {
    const result = await res.json();
    locationName.value = result.location.name;
    icon.src = result.current.condition.icon;
    temperature.textContent = roundValues(result.current.temp_c);
    summary.textContent = result.current.condition.text;
    feelsLike.textContent = roundValues(result.current.feelslike_c);
  } else {
    alert("No data for this location");
  }
};

const getWeatherHandler = function () {
  const location = locationName.value;
  locationName.value = "";
  updateWeather(location);
};

const getWeather = async function (query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=7ec015de2e714f1d8e955815242907&q=${query}&aqi=no`;

  const res = await fetch(url);
  return res;
};

const roundValues = function (fractionalVal) {
  return Math.round(fractionalVal);
};

currentPosition();

searchBtn.addEventListener("click", getWeatherHandler);
