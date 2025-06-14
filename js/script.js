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

// === HAMBURGER MENU TOGGLE ===
// Get the hamburger menu and nav list
const hamburger = document.getElementById('hamburger-menu');
const navList = document.getElementById('nav-list');

// Toggle the navigation menu when the hamburger icon is clicked
hamburger.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// === Modal JavaScript ===

// Get modal element and button
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close-btn');

// Open the modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close the modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal if clicked outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// === Dynamic Featured Members or Spotlight ===
const items = [
const items = [
  { name: 'John Doe', description: 'CEO of Minot Chamber', image: 'image1.jpg' },
  { name: 'Jane Smith', description: 'Marketing Specialist', image: 'image2.jpg' },
  { name: 'David Brown', description: 'Event Coordinator', image: 'image3.jpg' },
  { name: 'Sarah Lee', description: 'Community Outreach', image: 'image4.jpg' },
  { name: 'Tom White', description: 'Membership Manager', image: 'image5.jpg' },
  { name: 'Emily Davis', description: 'Business Relations', image: 'image6.jpg' },
  { name: 'Mark Wilson', description: 'Customer Service', image: 'image7.jpg' },
  { name: 'Nina Clark', description: 'Operations Director', image: 'image8.jpg' },
  { name: 'Chris Adams', description: 'IT Specialist', image: 'image9.jpg' },
  { name: 'Katie Bell', description: 'Product Manager', image: 'image10.jpg' },
  { name: 'Andrew Scott', description: 'Finance Lead', image: 'image11.jpg' },
  { name: 'Rachel Moore', description: 'HR Manager', image: 'image12.jpg' },
  { name: 'Leo Carter', description: 'Sales Manager', image: 'image13.jpg' },
  { name: 'Anna Perez', description: 'Marketing Director', image: 'image14.jpg' },
  { name: 'James Johnson', description: 'Operations Lead', image: 'image15.jpg' }
];


const itemList = document.getElementById('spotlight');
items.forEach(item => {
  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');
  itemCard.innerHTML = `
    <img src="images/${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
  `;
  itemList.appendChild(itemCard);
});
