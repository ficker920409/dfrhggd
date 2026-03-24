// Hourly page logic
document.addEventListener('DOMContentLoaded', function() {
    loadHourlyPage();
});

function loadHourlyPage() {
    currentCity = getCurrentCity();
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = `Hourly Forecast for ${currentCity}`;
    }
    
    // Generate and display hourly data
    const hourlyData = generateHourlyForecast(48);
    displayHourlyTable(hourlyData);
}

function displayHourlyTable(hourlyData) {
    const container = document.getElementById('hourlyTable');
    if (!container) return;
    
    container.innerHTML = hourlyData.map(hour => {
        const date = hour.time;
        const timeStr = formatTime(date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        return `
            <div class="hourly-row">
                <div class="hour-col">
                    <div class="time-info">
                        <span class="time-hour">${timeStr}</span>
                        <span class="time-date">${dateStr}</span>
                    </div>
                </div>
                <div class="temp-col">${hour.temp}°C</div>
                <div class="condition-col">
                    <div class="condition-icon">${getWeatherIcon(hour.icon)}</div>
                    <div class="condition-text">${hour.condition}</div>
                </div>
                <div class="wind-col">
                    <span class="col-label">Wind</span>
                    <span class="col-value">${hour.wind} m/s ${hour.windDir}</span>
                </div>
                <div class="humidity-col">
                    <span class="col-label">Humidity</span>
                    <span class="col-value">${hour.humidity}%</span>
                </div>
                <div class="pressure-col">
                    <span class="col-label">Pressure</span>
                    <span class="col-value">${hour.pressure} hPa</span>
                </div>
                <div class="precip-col">
                    <span class="col-label">Precip</span>
                    <span class="col-value">${hour.precipitation}%</span>
                </div>
            </div>
        `;
    }).join('');
}
