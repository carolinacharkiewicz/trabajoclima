import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './styles.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchWeather = (city) => {
        const API_KEY = '30d38b26954359266708f92e1317dac0';
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => {
                setWeatherData(response.data);
                setCity(city);
                saveSearch(city);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    };

    const saveSearch = (city) => {
        axios.post('http://localhost:5000/api/search', { city })
            .then(() => fetchHistory())
            .catch(error => console.error('Error saving search:', error));
    };

    const fetchHistory = () => {
        axios.get('http://localhost:5000/api/search')
            .then(response => setHistory(response.data))
            .catch(error => console.error('Error fetching history:', error));
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            fetchWeather(event.target.value);
        }
    };

    return (
        <div className="app">
            <nav className="full-width centered-nav">
                <ul className="nav-left">
                    <li><strong>Clima</strong></li>
                </ul>
                <ul className="nav-right">
                    <li><a href="#" onClick={() => fetchWeather('Tucumán')}>Tucumán</a></li>
                    <li><a href="#" onClick={() => fetchWeather('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => fetchWeather('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                id="cityInput"
                className="full-width"
                type="search"
                name="search"
                placeholder="Buscar ciudad..."
                aria-label="Buscar"
                onKeyDown={handleSearch}
            />
            {weatherData && <WeatherCard weatherData={weatherData} city={city} />}
            <div className="history">
                <h3>Historial de Búsqueda</h3>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item.city} - {new Date(item.date).toLocaleString()}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
