import React from 'react';

function WeatherCard({ weatherData, city }) {
    const icon = weatherData.weather[0].icon;
    return (
        <div className="weather-card">
            <h2>{city}</h2>
            <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
            </div>
            <div className="weather-info">
                <p><strong>Temperatura: {weatherData.main.temp}°C</strong></p>
                <p>Mínima: {weatherData.main.temp_min}°C / Máxima: {weatherData.main.temp_max}°C</p>
                <p>Humedad: {weatherData.main.humidity}%</p>
            </div>
        </div>
    );
}

export default WeatherCard;
