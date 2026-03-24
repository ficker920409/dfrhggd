// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Load saved city
    currentCity = getCurrentCity();
    
    // Initialize search
    const searchInput = document.getElementById('citySearch');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Load weather data
    loadWeatherData();
}

function handleSearch() {
    const searchInput = document.getElementById('citySearch');
    const cityName = searchInput.value.trim();
    
    if (cityName) {
        setCurrentCity(cityName);
        loadWeatherData();
    }
}

function loadWeatherData() {
    const weather = getCurrentWeather(currentCity);
    
    // Update current weather
    updateCurrentWeather(weather);
    
    // Update hourly preview
    const hourlyData = generateHourlyForecast(24);
    updateHourlyPreview(hourlyData.slice(0, 12));
    
    // Update daily forecast
    const dailyData = generateDailyForecast(7);
    updateDailyForecast(dailyData);
}

function updateCurrentWeather(weather) {
    // Update city name and date
    const cityName = document.getElementById('cityName');
    const currentDate = document.getElementById('currentDate');
    
    if (cityName) {
        cityName.textContent = weather.city;
    }
    
    if (currentDate) {
        const now = new Date();
        currentDate.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Update temperature
    const currentTemp = document.getElementById('currentTemp');
    if (currentTemp) {
        currentTemp.textContent = weather.temp;
    }
    
    // Update icon
    const mainIcon = document.getElementById('mainWeatherIcon');
    if (mainIcon) {
        mainIcon.innerHTML = getWeatherIcon(weather.icon);
    }
    
    // Update details
    updateElement('feelsLike', `${weather.feelsLike}°C`);
    updateElement('condition', weather.condition);
    updateElement('wind', `${weather.wind} m/s, ${weather.windDir}`);
    updateElement('humidity', `${weather.humidity}%`);
    updateElement('pressure', `${weather.pressure} hPa`);
    updateElement('visibility', `${weather.visibility} km`);
    
    // Update sun/moon data
    updateElement('sunrise', weather.sunrise);
    updateElement('sunset', weather.sunset);
    updateElement('dayLength', weather.dayLength);
    
    // Update AQI
    const aqiInfo = getAQILabel(weather.aqi);
    const aqiValue = document.getElementById('aqiValue');
    if (aqiValue) {
        aqiValue.innerHTML = `
            <span class="aqi-number" style="color: ${aqiInfo.color}">${weather.aqi}</span>
            <span class="aqi-label">${aqiInfo.label}</span>
        `;
    }
}

function updateHourlyPreview(hourlyData) {
    const container = document.getElementById('hourlyPreview');
    if (!container) return;
    
    container.innerHTML = hourlyData.map(hour => `
        <div class="hourly-item">
            <div class="hour-time">${formatHour(hour.hour)}</div>
            <div class="hour-icon">${getWeatherIcon(hour.icon)}</div>
            <div class="hour-temp">${hour.temp}°</div>
            <div class="hour-desc">${hour.condition}</div>
        </div>
    `).join('');
}

function updateDailyForecast(dailyData) {
    const container = document.getElementById('dailyForecast');
    if (!container) return;
    
    container.innerHTML = dailyData.map(day => `
        <div class="forecast-day">
            <div class="day-info">
                <div class="day-name">${day.dayName}</div>
                <div class="day-date">${formatDate(day.date)}</div>
            </div>
            <div class="day-icon">${getWeatherIcon(day.icon)}</div>
            <div class="day-condition">${day.condition}</div>
            <div class="day-temp">
                <span class="temp-max">${day.tempMax}°</span>
                <span class="temp-min">${day.tempMin}°</span>
            </div>
        </div>
    `).join('');
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function formatHour(hour) {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
