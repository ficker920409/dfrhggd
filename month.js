// Month page logic
document.addEventListener('DOMContentLoaded', function() {
    loadMonthPage();
});

function loadMonthPage() {
    currentCity = getCurrentCity();
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    const now = new Date();
    const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (pageTitle) {
        pageTitle.textContent = `Monthly Forecast for ${currentCity}`;
    }
    
    if (pageSubtitle) {
        pageSubtitle.textContent = monthName;
    }
    
    // Generate and display monthly data
    const monthlyData = generateMonthlyForecast();
    displayMonthCalendar(monthlyData);
    displayMonthStats(monthlyData);
}

function displayMonthCalendar(monthlyData) {
    const container = document.getElementById('monthCalendar');
    if (!container) return;
    
    // Get first day of month and calculate offset
    const firstDay = monthlyData[0].date;
    const firstDayOfWeek = firstDay.getDay();
    const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday = 0
    
    let html = '';
    
    // Add empty cells for offset
    for (let i = 0; i < offset; i++) {
        html += '<div class="calendar-day empty"></div>';
    }
    
    // Add days
    monthlyData.forEach(day => {
        html += `
            <div class="calendar-day">
                <div class="day-number">${day.day}</div>
                <div class="day-weather-icon">${getWeatherIcon(day.icon)}</div>
                <div class="day-temps">
                    <span class="day-temp-max">${day.tempMax}°</span>
                    <span class="day-temp-min">${day.tempMin}°</span>
                </div>
                ${day.precipitation > 30 ? `<div class="day-precip">${day.precipitation}%</div>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayMonthStats(monthlyData) {
    const container = document.getElementById('monthStats');
    if (!container) return;
    
    // Calculate statistics
    const temps = monthlyData.map(d => (d.tempMax + d.tempMin) / 2);
    const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
    const maxTemp = Math.max(...monthlyData.map(d => d.tempMax));
    const minTemp = Math.min(...monthlyData.map(d => d.tempMin));
    
    const rainyDays = monthlyData.filter(d => d.precipitation > 50).length;
    const sunnyDays = monthlyData.filter(d => d.condition === 'Clear').length;
    
    const totalPrecip = monthlyData.reduce((sum, d) => sum + d.precipitation, 0);
    const avgPrecip = Math.round(totalPrecip / monthlyData.length);
    
    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                </svg>
            </div>
            <div class="stat-value">${avgTemp}°C</div>
            <div class="stat-label">Average Temperature</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                </svg>
            </div>
            <div class="stat-value">${maxTemp}° / ${minTemp}°</div>
            <div class="stat-label">Max / Min Temperature</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="16" y1="13" x2="16" y2="21"></line>
                    <line x1="8" y1="13" x2="8" y2="21"></line>
                    <line x1="12" y1="15" x2="12" y2="23"></line>
                    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
                </svg>
            </div>
            <div class="stat-value">${rainyDays}</div>
            <div class="stat-label">Rainy Days</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </div>
            <div class="stat-value">${sunnyDays}</div>
            <div class="stat-label">Sunny Days</div>
        </div>
    `;
}
