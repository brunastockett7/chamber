const year = document.getElementById("year");
const lastModified = document.getElementById("lastModified");

if (year && lastModified) {
  year.textContent = new Date().getFullYear();
  lastModified.textContent = document.lastModified;
}

// Weather fetch function
async function fetchWeather() {
  const weatherDiv = document.getElementById('weatherData');
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.2325&longitude=-101.2963&current_weather=true');
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();
    const weather = data.current_weather;

    weatherDiv.innerHTML = `
      <p>Temperature: ${weather.temperature}°C</p>
      <p>Wind Speed: ${weather.windspeed} km/h</p>
      <p>Weather Code: ${weather.weathercode}</p>
      <p>Time: ${new Date(weather.time).toLocaleString()}</p>
    `;
  } catch (error) {
    weatherDiv.textContent = 'Unable to load weather data.';
    console.error(error);
  }
}

fetchWeather();
