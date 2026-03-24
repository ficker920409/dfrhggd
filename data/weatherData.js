// Mock weather data generator
const weatherConditions = [
    { name: 'Clear', icon: 'd.c0', code: 'c0' },
    { name: 'Partly Cloudy', icon: 'd.c1', code: 'c1' },
    { name: 'Cloudy', icon: 'd.c2', code: 'c2' },
    { name: 'Overcast', icon: 'd.c3', code: 'c3' },
    { name: 'Light Rain', icon: 'd.r1', code: 'r1' },
    { name: 'Rain', icon: 'd.r2', code: 'r2' },
    { name: 'Heavy Rain', icon: 'd.r3', code: 'r3' },
    { name: 'Light Snow', icon: 'd.s1', code: 's1' },
    { name: 'Snow', icon: 'd.s2', code: 's2' },
];

const cities = [
    'Moscow', 'London', 'New York', 'Tokyo', 'Paris',
    'Berlin', 'Sydney', 'Dubai', 'Singapore', 'Mumbai'
];

const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function getRandomCondition() {
    return weatherConditions[getRandomInt(0, weatherConditions.length - 1)];
}

function getCurrentWeather(cityName = 'Moscow') {
    const condition = getRandomCondition();
    const temp = getRandomInt(-5, 30);
    
    return {
        city: cityName,
        temp: temp,
        feelsLike: temp - getRandomInt(0, 5),
        condition: condition.name,
        icon: condition.icon,
        code: condition.code,
        humidity: getRandomInt(40, 90),
        wind: getRandomFloat(0, 20),
        windDir: windDirections[getRandomInt(0, 7)],
        pressure: getRandomInt(990, 1030),
        visibility: getRandomInt(5, 10),
        dewPoint: getRandomInt(-10, 20),
        uvIndex: getRandomInt(0, 11),
        cloudiness: getRandomInt(0, 100)
    };
}

function getTomorrowWeather(cityName = 'Moscow') {
    return getCurrentWeather(cityName);
}

function generateHourlyForecast(hours = 24, startOffset = 0) {
    const forecast = [];
    const now = new Date();
    
    for (let i = startOffset; i < startOffset + hours; i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);
        const condition = getRandomCondition();
        const temp = getRandomInt(-5, 30);
        
        forecast.push({
            time: time,
            hour: time.getHours(),
            temp: temp,
            feelsLike: temp - getRandomInt(0, 3),
            condition: condition.name,
            icon: condition.icon,
            code: condition.code,
            humidity: getRandomInt(30, 90),
            wind: getRandomFloat(0, 15),
            windDir: windDirections[getRandomInt(0, 7)],
            pressure: getRandomInt(990, 1030),
            precipitation: getRandomInt(0, 100),
            cloudiness: getRandomInt(0, 100)
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
        const tempMax = getRandomInt(10, 30);
        const tempMin = getRandomInt(-5, tempMax - 5);
        
        forecast.push({
            date: date,
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            dayNameLong: date.toLocaleDateString('en-US', { weekday: 'long' }),
            dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            tempMax: tempMax,
            tempMin: tempMin,
            tempMorning: getRandomInt(tempMin, tempMax),
            tempDay: getRandomInt(tempMin + 2, tempMax),
            tempEvening: getRandomInt(tempMin, tempMax - 2),
            tempNight: tempMin,
            condition: condition.name,
            icon: condition.icon,
            code: condition.code,
            humidity: getRandomInt(40, 90),
            wind: getRandomFloat(0, 20),
            windDir: windDirections[getRandomInt(0, 7)],
            precipitation: getRandomInt(0, 100),
            pressure: getRandomInt(990, 1030),
            cloudiness: getRandomInt(0, 100)
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
        const tempMax = getRandomInt(10, 30);
        const tempMin = getRandomInt(-5, tempMax - 5);
        
        forecast.push({
            date: date,
            day: day,
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            tempMax: tempMax,
            tempMin: tempMin,
            condition: condition.name,
            icon: condition.icon,
            code: condition.code,
            precipitation: getRandomInt(0, 100)
        });
    }
    
    return forecast;
}

function getWeekendForecast() {
    const now = new Date();
    const currentDay = now.getDay();
    const daysUntilSaturday = (6 - currentDay + 7) % 7;
    
    const saturday = new Date(now.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
    const sunday = new Date(saturday.getTime() + 24 * 60 * 60 * 1000);
    
    const forecast = [];
    
    [saturday, sunday].forEach(date => {
        const condition = getRandomCondition();
        const tempMax = getRandomInt(10, 30);
        const tempMin = getRandomInt(-5, tempMax - 5);
        
        forecast.push({
            date: date,
            dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
            dateStr: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            tempMax: tempMax,
            tempMin: tempMin,
            condition: condition.name,
            icon: condition.icon,
            code: condition.code,
            humidity: getRandomInt(40, 90),
            wind: getRandomFloat(0, 20),
            windDir: windDirections[getRandomInt(0, 7)],
            precipitation: getRandomInt(0, 100)
        });
    });
    
    return forecast;
}

module.exports = {
    getCurrentWeather,
    getTomorrowWeather,
    generateHourlyForecast,
    generateDailyForecast,
    generateMonthlyForecast,
    getWeekendForecast
};
