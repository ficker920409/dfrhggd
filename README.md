# Weather Forecast Website

A weather forecast website with EJS templates and Express.js backend, inspired by professional weather services.

## Features

### Pages
- **Main Page** (`/`) - Current weather, hourly preview, and 7-day forecast
- **Now** (`/now`) - Detailed current weather conditions
- **Today** (`/today`) - Hourly forecast for today
- **Tomorrow** (`/tomorrow`) - Weather forecast for tomorrow
- **3 Days** (`/3-days`) - 3-day detailed forecast
- **Weekend** (`/weekend`) - Weekend weather outlook
- **10 Days** (`/10-days`) - Extended 10-day forecast
- **2 Weeks** (`/2-weeks`) - Two-week forecast
- **Month** (`/month`) - Monthly calendar view

### Key Features
- City search functionality
- Responsive design for all devices
- Temperature, humidity, wind, pressure data
- Weather icons for different conditions
- Clean, professional UI inspired by Gismeteo

## Technology Stack
- Node.js + Express.js
- EJS templating engine
- Vanilla JavaScript
- CSS3
- Mock weather data (for demonstration)

## Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

# Development mode with auto-reload
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure
```
├── data/
│   └── weatherData.js      # Mock weather data generator
├── public/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── app.js          # Client-side JavaScript
│   └── images/
│       └── weather-icons/  # Weather condition icons
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Header partial
│   │   └── footer.ejs      # Footer partial
│   ├── index.ejs           # Main page
│   ├── now.ejs             # Current weather page
│   ├── today.ejs           # Today's forecast
│   ├── tomorrow.ejs        # Tomorrow's forecast
│   ├── 3-days.ejs          # 3-day forecast
│   ├── weekend.ejs         # Weekend forecast
│   ├── 10-days.ejs         # 10-day forecast
│   ├── 2-weeks.ejs         # 2-week forecast
│   └── month.ejs           # Monthly calendar
├── server.js               # Express server
└── package.json            # Dependencies
```

## Usage

### Search for a City
Use the search box in the header to look up weather for different cities.

### Navigate Between Views
Use the navigation menu to switch between different forecast periods.

## API Integration
This is a demonstration using mock data. To integrate with a real weather API:

1. Sign up for a weather API service (OpenWeatherMap, WeatherAPI, etc.)
2. Replace the mock data generator in `data/weatherData.js` with API calls
3. Add your API key to environment variables
4. Update the data fetching logic in `server.js`

## License
Created for demonstration purposes.
