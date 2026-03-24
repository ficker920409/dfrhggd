// 10 Days page logic
document.addEventListener('DOMContentLoaded', function() {
    load10DaysPage();
});

function load10DaysPage() {
    currentCity = getCurrentCity();
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = `10 Day Forecast for ${currentCity}`;
    }
    
    // Generate and display 10-day data
    const dailyData = generateDailyForecast(10);
    display10DaysGrid(dailyData);
    displaySummary(dailyData);
}

function display10DaysGrid(dailyData) {
    const container = document.getElementById('tenDaysGrid');
    if (!container) return;
    
    container.innerHTML = dailyData.map(day => {
        const dateStr = day.date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="day-card">
                <div class="day-header">
                    <div class="day-name">${day.dayName}</div>
                    <div class="day-date">${dateStr}</div>
                </div>
                <div class="day-icon-large">
                    ${getWeatherIcon(day.icon)}
                </div>
                <div class="day-description">
                    <div class="day-condition">${day.condition}</div>
                    <div class="day-feels">Humidity: ${day.humidity}%</div>
                </div>
                <div class="day-temperature">
                    <div class="temp-range">
                        <span class="temp-max">${day.tempMax}°</span>
                        <span class="temp-min">${day.tempMin}°</span>
                    </div>
                    <div class="temp-bar"></div>
                </div>
                <div class="day-extra">
                    <div class="extra-item">
                        <span class="extra-label">Wind</span>
                        <span class="extra-value">${day.wind} m/s ${day.windDir}</span>
                    </div>
                    <div class="extra-item">
                        <span class="extra-label">Precip</span>
                        <span class="extra-value">${day.precipitation}%</span>
                    </div>
                    <div class="extra-item">
                        <span class="extra-label">Sunrise</span>
                        <span class="extra-value">${day.sunrise}</span>
                    </div>
                    <div class="extra-item">
                        <span class="extra-label">Sunset</span>
                        <span class="extra-value">${day.sunset}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function displaySummary(dailyData) {
    const container = document.getElementById('summaryCards');
    if (!container) return;
    
    // Calculate averages
    const avgTemp = Math.round(
        dailyData.reduce((sum, day) => sum + (day.tempMax + day.tempMin) / 2, 0) / dailyData.length
    );
    
    const avgHumidity = Math.round(
        dailyData.reduce((sum, day) => sum + day.humidity, 0) / dailyData.length
    );
    
    const rainyDays = dailyData.filter(day => day.precipitation > 50).length;
    
    container.innerHTML = `
        <div class="summary-card">
            <h4>Average Temperature</h4>
            <div class="summary-value">${avgTemp}°C</div>
            <div class="summary-label">Over 10 days</div>
        </div>
        <div class="summary-card">
            <h4>Average Humidity</h4>
            <div class="summary-value">${avgHumidity}%</div>
            <div class="summary-label">Over 10 days</div>
        </div>
        <div class="summary-card">
            <h4>Rainy Days</h4>
            <div class="summary-value">${rainyDays}</div>
            <div class="summary-label">Days with rain expected</div>
        </div>
    `;
}
