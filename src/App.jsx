import React, { useState } from 'react';


const WeatherApp = () => {
  const API_KEY = '7aba3fa663f74c3a99e64504250703';
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherByCity = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    try {
      setError('');
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      console.log(data)
      if (data.error) {
        setError(data.error.message)
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: "center" }}>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={fetchWeatherByCity}>Submit</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && weatherData && (
        <div className="weather-details">
          <div className="weather-card">
            <h3>City: {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h3>
          </div>
          <div className="weather-card">
            <p><strong>Temperature:</strong> {weatherData.current.temp_c} °C ({weatherData.current.temp_f} °F)</p>
            <p><strong>Feels Like:</strong> {weatherData.current.feelslike_c} °C ({weatherData.current.feelslike_f} °F)</p>
            <p><strong>Humidity:</strong> {weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <p><strong>Weather:</strong> {weatherData.current.condition.text}</p>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              className="weather-icon"
            />
          </div>
          <div className="weather-card">
            <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} km/h ({weatherData.current.wind_mph} mph)</p>
            <p><strong>Wind Direction:</strong> {weatherData.current.wind_dir}</p>
          </div>
          <div className="weather-card">
            <p><strong>Pressure:</strong> {weatherData.current.pressure_mb} mb</p>
            <p><strong>Visibility:</strong> {weatherData.current.vis_km} km</p>
          </div>
          <div className="weather-card">
            <p><strong>Dewpoint:</strong> {weatherData.current.dewpoint_c} °C ({weatherData.current.dewpoint_f} °F)</p>
            <p><strong>UV Index:</strong> {weatherData.current.uv}</p>
            <p><strong>Cloud Coverage:</strong> {weatherData.current.cloud} %</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;