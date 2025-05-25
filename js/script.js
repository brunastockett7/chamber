/* eslint-env browser */

/* global document, fetch, console */
const year = document.getElementById('year');
const lastModified = document.getElementById('lastModified');

if (year) {
  year.textContent = new Date().getFullYear();
}
if (lastModified) {
  lastModified.textContent = document.lastModified;
}

// === WEATHER FETCH FUNCTION ===
async function fetchWeather() {
  const weatherDiv = document.getElementById('weatherData');

  if (!weatherDiv) return;

  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=48.2325&longitude=-101.2963&current_weather=true',
    );

    if (!response.ok) {
      throw new Error('Weather fetch failed');
    }

    const data = await response.json();
    const weather = data.current_weather;

    weatherDiv.innerHTML = `
      <p aria-label="Current temperature">🌡️ Temperature: ${weather.temperature}°C</p>
      <p aria-label="Wind speed">🌬️ Wind Speed: ${weather.windspeed} km/h</p>
      <p aria-label="Weather code">🌦️ Weather Code: ${weather.weathercode}</p>
      <p aria-label="Data time">🕒 Time: ${new Date(weather.time).toLocaleString()}</p>
    `;
  } catch (error) {
    weatherDiv.textContent = 'Unable to load weather data.';
    console.error('Error fetching weather:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchWeather);

