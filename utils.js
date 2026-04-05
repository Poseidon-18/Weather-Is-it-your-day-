// ========== UTILITY FUNCTIONS ==========
// This file contains reusable helper functions for your weather app

// ========== STRING FORMATTING ==========

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 * @example capitalizeWords('new york') // returns 'New York'
 */
function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Formats a date to a readable string
 * @param {Date|string} date - Date object or string
 * @param {string} format - Format type: 'full', 'short', 'day', 'time'
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'full') {
    const d = new Date(date);
    const options = {
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        short: { weekday: 'short', month: 'short', day: 'numeric' },
        day: { weekday: 'long' },
        time: { hour: '2-digit', minute: '2-digit' }
    };
    
    return d.toLocaleDateString('en-US', options[format]);
}

/**
 * Gets the day name from a date
 * @param {Date|string} date - Date object or string
 * @returns {string} Day name (e.g., 'Monday')
 */
function getDayName(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Gets the short day name from a date
 * @param {Date|string} date - Date object or string
 * @returns {string} Short day name (e.g., 'Mon')
 */
function getShortDayName(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
}

// ========== TEMPERATURE & WEATHER UTILITIES ==========

/**
 * Converts temperature between units
 * @param {number} temp - Temperature value
 * @param {string} from - Current unit ('C', 'F', 'K')
 * @param {string} to - Target unit ('C', 'F', 'K')
 * @returns {number} Converted temperature
 */
function convertTemperature(temp, from, to) {
    let celsius = temp;
    
    // Convert to Celsius first
    if (from === 'F') celsius = (temp - 32) * 5/9;
    if (from === 'K') celsius = temp - 273.15;
    
    // Convert from Celsius to target
    if (to === 'C') return Math.round(celsius);
    if (to === 'F') return Math.round((celsius * 9/5) + 32);
    if (to === 'K') return Math.round(celsius + 273.15);
    
    return Math.round(celsius);
}

/**
 * Gets weather condition category for theming
 * @param {string} description - Weather description
 * @returns {string} Weather category (sunny, rainy, snowy, stormy, cloudy)
 */
function getWeatherCategory(description) {
    const condition = description.toLowerCase();
    
    if (condition.includes('clear') || condition.includes('sun')) return 'sunny';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('snow') || condition.includes('sleet')) return 'snowy';
    if (condition.includes('thunder') || condition.includes('storm') || condition.includes('lightning')) return 'stormy';
    if (condition.includes('cloud') || condition.includes('overcast')) return 'cloudy';
    
    return 'default';
}

/**
 * Gets weather advice based on conditions
 * @param {number} temp - Temperature in Celsius
 * @param {string} condition - Weather condition
 * @returns {string} Helpful advice
 */
function getWeatherAdvice(temp, condition) {
    const conditionLower = condition.toLowerCase();
    
    if (temp >= 30) return "🥵 It's hot! Stay hydrated and wear sunscreen!";
    if (temp <= 0) return "🥶 Freezing! Bundle up and stay warm!";
    if (conditionLower.includes('rain')) return "☔ Don't forget your umbrella!";
    if (conditionLower.includes('snow')) return "⛄ Perfect weather for snow activities!";
    if (conditionLower.includes('thunder')) return "⚡ Seek shelter! Stay safe indoors!";
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) return "😎 Great weather for outdoor activities!";
    if (conditionLower.includes('cloud')) return "☁️ Perfect day for a walk!";
    
    return "🌡️ Check the forecast before heading out!";
}

// ========== STORAGE UTILITIES ==========

/**
 * Saves data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store (will be JSON stringified)
 */
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        return false;
    }
}

/**
 * Retrieves data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed data or defaultValue
 */
function getFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Failed to read from localStorage:', error);
        return defaultValue;
    }
}

/**
 * Saves recent cities search history
 * @param {string} city - City name to save
 */
function saveRecentCity(city) {
    let recentCities = getFromLocalStorage('recentCities', []);
    
    // Remove if already exists
    recentCities = recentCities.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    recentCities.unshift(city);
    
    // Keep only last 5
    recentCities = recentCities.slice(0, 5);
    
    saveToLocalStorage('recentCities', recentCities);
}

/**
 * Gets recent cities from history
 * @returns {Array} Array of recent cities
 */
function getRecentCities() {
    return getFromLocalStorage('recentCities', []);
}

/**
 * Saves user preferences
 * @param {Object} preferences - User preferences object
 */
function savePreferences(preferences) {
    const existing = getFromLocalStorage('preferences', {});
    saveToLocalStorage('preferences', { ...existing, ...preferences });
}

/**
 * Gets user preferences
 * @returns {Object} User preferences
 */
function getPreferences() {
    return getFromLocalStorage('preferences', { units: 'metric', theme: 'auto' });
}

// ========== VALIDATION UTILITIES ==========

/**
 * Validates if a string is a valid city name
 * @param {string} city - City name to validate
 * @returns {boolean} True if valid
 */
function isValidCityName(city) {
    if (!city || typeof city !== 'string') return false;
    if (city.trim().length < 2) return false;
    if (/[0-9]/.test(city)) return false; // No numbers allowed
    return true;
}

/**
 * Validates if a string is a valid date
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid date
 */
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// ========== DOM UTILITIES ==========

/**
 * Shows a loading spinner on an element
 * @param {HTMLElement} element - Element to show loading state on
 */
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

/**
 * Hides loading spinner from an element
 * @param {HTMLElement} element - Element to hide loading state from
 */
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

/**
 * Debounces a function (prevents too many rapid calls)
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttles a function (limits how often it can be called)
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== GEOLOCATION UTILITIES ==========

/**
 * Checks if geolocation is supported by the browser
 * @returns {boolean} True if supported
 */
function isGeolocationSupported() {
    return 'geolocation' in navigator;
}

/**
 * Gets user's current position with error handling
 * @returns {Promise<Object>} Promise that resolves to position object
 */
function getUserPosition() {
    return new Promise((resolve, reject) => {
        if (!isGeolocationSupported()) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    });
}

// ========== ANIMATION UTILITIES ==========

/**
 * Adds a fade-out animation to an element before removing it
 * @param {HTMLElement} element - Element to fade out
 * @param {number} duration - Animation duration in ms
 * @returns {Promise} Promise that resolves after animation
 */
function fadeOut(element, duration = 300) {
    return new Promise(resolve => {
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = '0';
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

/**
 * Adds a fade-in animation to an element
 * @param {HTMLElement} element - Element to fade in
 * @param {number} duration - Animation duration in ms
 */
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

// ========== URL UTILITIES ==========

/**
 * Gets query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Updates URL with new parameter without reloading page
 * @param {Object} params - Key-value pairs to add to URL
 */
function updateUrlParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });
    window.history.pushState({}, '', url);
}

// ========== EXPORTS (if using modules) ==========
// If you're using ES6 modules, uncomment the line below
// export {
//     capitalizeWords,
//     formatDate,
//     getDayName,
//     getShortDayName,
//     convertTemperature,
//     getWeatherCategory,
//     getWeatherAdvice,
//     saveToLocalStorage,
//     getFromLocalStorage,
//     saveRecentCity,
//     getRecentCities,
//     savePreferences,
//     getPreferences,
//     isValidCityName,
//     isValidDate,
//     showLoading,
//     hideLoading,
//     debounce,
//     throttle,
//     isGeolocationSupported,
//     getUserPosition,
//     fadeOut,
//     fadeIn,
//     getUrlParameter,
//     updateUrlParams
// };