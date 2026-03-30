const API_KEY = ''; 
const BASE_URL = 'https://api.weatherapi.com/v1';

// Fetch current weather
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error(`City "${city}" not found`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Fetch 3-day forecast (free tier gives 3 days)
async function fetchForecastByCity(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Fetch forecast by coordinates
async function fetchForecastByCoords(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}