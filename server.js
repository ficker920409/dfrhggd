const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mock data generator
const weatherData = require('./data/weatherData');

// Routes
app.get('/', (req, res) => {
    const city = req.query.city || 'Moscow';
    const currentWeather = weatherData.getCurrentWeather(city);
    const hourlyForecast = weatherData.generateHourlyForecast(24);
    const dailyForecast = weatherData.generateDailyForecast(7);
    
    res.render('index', {
        city,
        currentWeather,
        hourlyForecast,
        dailyForecast,
        activePage: 'index'
    });
});

app.get('/now', (req, res) => {
    const city = req.query.city || 'Moscow';
    const currentWeather = weatherData.getCurrentWeather(city);
    
    res.render('now', {
        city,
        currentWeather,
        activePage: 'now'
    });
});

app.get('/today', (req, res) => {
    const city = req.query.city || 'Moscow';
    const currentWeather = weatherData.getCurrentWeather(city);
    const hourlyForecast = weatherData.generateHourlyForecast(24);
    
    res.render('today', {
        city,
        currentWeather,
        hourlyForecast,
        activePage: 'today'
    });
});

app.get('/tomorrow', (req, res) => {
    const city = req.query.city || 'Moscow';
    const tomorrowWeather = weatherData.getTomorrowWeather(city);
    const hourlyForecast = weatherData.generateHourlyForecast(24, 24);
    
    res.render('tomorrow', {
        city,
        tomorrowWeather,
        hourlyForecast,
        activePage: 'tomorrow'
    });
});

app.get('/3-days', (req, res) => {
    const city = req.query.city || 'Moscow';
    const dailyForecast = weatherData.generateDailyForecast(3);
    
    res.render('3-days', {
        city,
        dailyForecast,
        activePage: '3-days'
    });
});

app.get('/weekend', (req, res) => {
    const city = req.query.city || 'Moscow';
    const weekendForecast = weatherData.getWeekendForecast();
    
    res.render('weekend', {
        city,
        weekendForecast,
        activePage: 'weekend'
    });
});

app.get('/10-days', (req, res) => {
    const city = req.query.city || 'Moscow';
    const dailyForecast = weatherData.generateDailyForecast(10);
    
    res.render('10-days', {
        city,
        dailyForecast,
        activePage: '10-days'
    });
});

app.get('/2-weeks', (req, res) => {
    const city = req.query.city || 'Moscow';
    const dailyForecast = weatherData.generateDailyForecast(14);
    
    res.render('2-weeks', {
        city,
        dailyForecast,
        activePage: '2-weeks'
    });
});

app.get('/month', (req, res) => {
    const city = req.query.city || 'Moscow';
    const monthlyForecast = weatherData.generateMonthlyForecast();
    
    res.render('month', {
        city,
        monthlyForecast,
        activePage: 'month'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
