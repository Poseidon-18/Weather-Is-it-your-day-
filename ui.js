//getting from weatherapi
function updateCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('temperature').textContent = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById('description').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    
    const iconUrl = `https:${data.current.condition.icon}`;
    document.getElementById('weather-icon').src = iconUrl;
    
    // Update theme based on weather condition
    updateWeatherTheme(data.current.condition.text);
}

// Update forecast for WeatherAPI
function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    const forecastDays = data.forecast.forecastday;
    
    forecastDays.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        card.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <img src="https:${day.day.condition.icon}" alt="weather icon">
            <p>${Math.round(day.day.avgtemp_c)}°C</p>
            <p>${day.day.condition.text}</p>
        `;
        
        forecastContainer.appendChild(card);
    });
}
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 4000);
}

function updateWeatherTheme(condition) {
    const body = document.body;
    body.className = ''; // clear existing
    const category = getWeatherCategory(condition); // from utils.js
    body.classList.add(category);
}