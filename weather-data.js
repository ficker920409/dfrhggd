// Mock weather data generator
const weatherConditions = [
    { name: 'Clear', icon: 'sun' },
    { name: 'Partly Cloudy', icon: 'cloud-sun' },
    { name: 'Cloudy', icon: 'cloud' },
    { name: 'Rainy', icon: 'cloud-rain' },
    { name: 'Thunderstorm', icon: 'cloud-lightning' },
    { name: 'Snowy', icon: 'cloud-snow' },
    { name: 'Foggy', icon: 'cloud-fog' }
];

const cities = [
    { name: 'Moscow', lat: 55.7558, lon: 37.6173, timezone: 'Europe/Moscow' },
    { name: 'London', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
    { name: 'New York', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York' },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
    { name: 'Paris', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris' },
    { name: 'Berlin', lat: 52.5200, lon: 13.4050, timezone: 'Europe/Berlin' },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai' },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' }
];

const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 1) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getRandomCondition() {
    return weatherConditions[getRandomInt(0, weatherConditions.length - 1)];
}

function generateHourlyForecast(hours = 24) {
    const forecast = [];
    const now = new Date();
    
    for (let i = 0; i < hours; i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);
        const condition = getRandomCondition();
        
        forecast.push({
            time: time,
            hour: time.getHours(),
            temp: getRandomInt(-5, 30),
            feelsLike: getRandomInt(-7, 28),
            condition: condition.name,
            icon: condition.icon,
            humidity: getRandomInt(30, 90),
            wind: getRandomFloat(0, 15),
            windDir: windDirections[getRandomInt(0, 7)],
            pressure: getRandomInt(990, 1030),
            precipitation: getRandomInt(0, 100)
        });
    }
    
    return forecast;
}

function generateDailyForecast(days = 10) {
    const forecast = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
        const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
        const condition = getRandomCondition();
        
        forecast.push({
            date: date,
            dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
            tempMax: getRandomInt(10, 30),
            tempMin: getRandomInt(-5, 15),
            condition: condition.name,
            icon: condition.icon,
            humidity: getRandomInt(40, 90),
            wind: getRandomFloat(0, 20),
            windDir: windDirections[getRandomInt(0, 7)],
            precipitation: getRandomInt(0, 100),
            sunrise: '06:45',
            sunset: '19:30'
        });
    }
    
    return forecast;
}

function generateMonthlyForecast() {
    const forecast = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const condition = getRandomCondition();
        
        forecast.push({
            date: date,
            day: day,
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            tempMax: getRandomInt(10, 30),
            tempMin: getRandomInt(-5, 15),
            condition: condition.name,
            icon: condition.icon,
            precipitation: getRandomInt(0, 100)
        });
    }
    
    return forecast;
}

function getCurrentWeather(cityName = 'Moscow') {
    const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase()) || cities[0];
    const condition = getRandomCondition();
    const temp = getRandomInt(-5, 30);
    
    return {
        city: city.name,
        lat: city.lat,
        lon: city.lon,
        temp: temp,
        feelsLike: temp - getRandomInt(0, 5),
        condition: condition.name,
        icon: condition.icon,
        humidity: getRandomInt(40, 90),
        wind: getRandomFloat(0, 20),
        windDir: windDirections[getRandomInt(0, 7)],
        pressure: getRandomInt(990, 1030),
        visibility: getRandomInt(5, 10),
        sunrise: '06:45',
        sunset: '19:30',
        dayLength: '12h 45m',
        aqi: getRandomInt(20, 150)
    };
}

function getWeatherIcon(iconName) {
    const icons = {
        'sun': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`,
        'cloud-sun': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"></path>
        </svg>`,
        'cloud': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`,
        'cloud-rain': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="16" y1="13" x2="16" y2="21"></line>
            <line x1="8" y1="13" x2="8" y2="21"></line>
            <line x1="12" y1="15" x2="12" y2="23"></line>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`,
        'cloud-lightning': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
            <polyline points="13 11 9 17 15 17 11 23"></polyline>
        </svg>`,
        'cloud-snow': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
            <line x1="8" y1="16" x2="8.01" y2="16"></line>
            <line x1="8" y1="20" x2="8.01" y2="20"></line>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
            <line x1="12" y1="22" x2="12.01" y2="22"></line>
            <line x1="16" y1="16" x2="16.01" y2="16"></line>
            <line x1="16" y1="20" x2="16.01" y2="20"></line>
        </svg>`,
        'cloud-fog': `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="17" y1="21" x2="9" y2="21"></line>
        </svg>`
    };
    
    return icons[iconName] || icons['sun'];
}

function getAQILabel(aqi) {
    if (aqi <= 50) return { label: 'Good', color: '#00e400' };
    if (aqi <= 100) return { label: 'Moderate', color: '#ffff00' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: '#ff7e00' };
    if (aqi <= 200) return { label: 'Unhealthy', color: '#ff0000' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: '#8f3f97' };
    return { label: 'Hazardous', color: '#7e0023' };
}

// Store current city
let currentCity = 'Moscow';

function setCurrentCity(cityName) {
    currentCity = cityName;
    localStorage.setItem('currentCity', cityName);
}

function getCurrentCity() {
    return localStorage.getItem('currentCity') || 'Moscow';
}
