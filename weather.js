let cityName = 'Mangalore'; // Default city
const apiKey = '414516d5b06a554c8abece498df5f4d8'; // Replace with your OpenWeatherMap API key

const urlTemplate = `https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid=${apiKey}&units=metric`;

async function fetchWeatherData(city) {
  const url = urlTemplate.replace('{cityName}', city); // Update the URL with the new city
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();

    // Access the temperature
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Optionally update the DOM with the new temperature
    document.querySelector('.temperature-display').innerHTML = `${Math.round(temperature)}°C`;
    document.querySelector('h3').innerHTML = `${city}`;
    document.querySelector('.percent').innerHTML = `${humidity}%`;
    document.querySelector('.speed').innerHTML = `${Math.round(windSpeed)} km/h`;

  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Initial fetch
fetchWeatherData(cityName);

const cityInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.icon');

searchButton.addEventListener('click', () => {
  cityName = cityInput.value; // Get the value from the input field
  fetchWeatherData(cityName); // Fetch the weather data for the new city
});
