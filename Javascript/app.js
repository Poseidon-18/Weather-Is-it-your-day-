// ========== js/app.js ==========

async function loadWeather(city) {
    try {
        const weatherData = await fetchWeatherByCity(city);
        const forecastData = await fetchForecastByCity(city);
        
        updateCurrentWeather(weatherData);
        updateForecast(forecastData);
    } catch (error) {
        showError(error.message);
    }
}

async function loadWeatherByLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const weatherData = await fetchWeatherByCoords(latitude, longitude);
                const forecastData = await fetchForecastByCoords(latitude, longitude);
                
                updateCurrentWeather(weatherData);
                updateForecast(forecastData);
            } catch (error) {
                showError(error.message);
            }
        },
        () => {
            showError('Unable to retrieve your location');
        }
    );
}

// Event Listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        loadWeather(city);
        document.getElementById('city-input').value = '';
    } else {
        showError('Please enter a city name');
    }
});

document.getElementById('location-btn').addEventListener('click', loadWeatherByLocation);

document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = e.target.value.trim();
        if (city) {
            loadWeather(city);
            e.target.value = '';
        }
    }
});

// Load default city on startup
loadWeather('London');