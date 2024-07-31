"use strict";

const locationName = document.getElementById("location");
const searchBtn = document.getElementById("search");
const temperature = document.getElementById("temperature");
const summary = document.getElementById("summary");
const feelsLike = document.getElementById("feels-like");

const currentPosition = function () {
  navigator.geolocation.getCurrentPosition((res) => {
    const para = [res.coords.latitude, res.coords.longitude];
    updateWeather(para);
  });
};

const updateWeather = async function (para) {
  let result;
  if (typeof para == "object") {
    const query = para.join(",");
    result = await getWeather(query);
  } else {
    result = await getWeather(para);
  }

  locationName.value = result.location.name;
  temperature.textContent = roundValues(result.current.temp_c);
  summary.textContent = result.current.condition.text;
  feelsLike.textContent = roundValues(result.current.feelslike_c);
};

const getWeatherHandler = function () {
  const para = document.getElementById("location").value;
  updateWeather(para);
};

const getWeather = async function (query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=7ec015de2e714f1d8e955815242907&q=${query}&aqi=no`;
  const res = await fetch(url);
  const result = await res.json();
  return result;
};

const roundValues = function (fractionalVal) {
  return Math.round(fractionalVal);
};

currentPosition();

searchBtn.addEventListener("click", getWeatherHandler);
