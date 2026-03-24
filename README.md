# WeatherNow - Weather Forecast Website

A modern, responsive weather forecast website inspired by professional weather services.

## Features

### Pages
- **Main Weather Page** (`index.html`) - Current weather, hourly preview, and 7-day forecast
- **Hourly Forecast** (`hourly.html`) - Detailed 48-hour forecast with all weather parameters
- **10 Day Forecast** (`10days.html`) - Extended weather outlook with statistics
- **Monthly Forecast** (`month.html`) - Calendar view of the entire month with statistics

### Key Features
- 🔍 City search functionality
- 📱 Fully responsive design
- 🌡️ Temperature, humidity, wind, pressure data
- 🌅 Sunrise/sunset information
- 💨 Air quality index
- 📊 Weather statistics and summaries
- 🎨 Modern, clean UI with smooth animations

## Technology Stack
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Mock data generation for demonstration

## Usage

Simply open `index.html` in a web browser to start using the application.

### Navigation
- Use the top navigation bar to switch between different forecast views
- Search for any city using the search box in the header
- Click on forecast cards for more details (interactive elements)

## File Structure
```
├── index.html          # Main weather page
├── hourly.html         # Hourly forecast page
├── 10days.html         # 10-day forecast page
├── month.html          # Monthly forecast page
├── styles.css          # Main stylesheet
├── hourly.css          # Hourly page styles
├── 10days.css          # 10-day page styles
├── month.css           # Monthly page styles
├── app.js              # Main application logic
├── hourly.js           # Hourly page logic
├── 10days.js           # 10-day page logic
├── month.js            # Monthly page logic
└── weather-data.js     # Mock data generator
```

## Data
This is a demonstration website using randomly generated weather data. In a production environment, you would integrate with a real weather API like:
- OpenWeatherMap
- WeatherAPI
- AccuWeather API
- Visual Crossing Weather

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is created for demonstration purposes.
