import { useEffect, useState } from "react";
import "./App.css";
import WeatherInfo from "./components/weatherInfo";
import { fetchWeatherData } from "./services/weatherService";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getWeather = async () => {
      if (location.trim())
        try {
          const { temperature, humidity } = await fetchWeatherData(
            location,
            API_URL,
            API_KEY
          );
          setTemperature(temperature);
          setHumidity(humidity);
        } catch (err) {
          setError(err.message || "Error al obtener datos del clima");
          setTemperature(null);
          setHumidity(null);
        }
    };

    getWeather();
  }, [location, API_KEY, API_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("ingrese la ciudad");
      setTemperature(null);
      setHumidity(null);
    }
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="form-weather">
        <h1>Weather App</h1>
        <input
          className="input-weather"
          onChange={handleChange}
          value={location}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="p-error">{error}</p>}
      {temperature && (
        <WeatherInfo
          location={location}
          temperature={temperature}
          humidity={humidity}
        />
      )}
    </div>
  );
}
export default App;
