import { useEffect, useState } from "react";
import "./App.css";
import WeatherInfo from "./components/weatherInfo";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}`);
      const data = await response.json();

      if (!data.main) {
        setError(`La ciudad "${cityName}" no ha sido encontrada`);
        setTemperature(null);
        setHumidity(null);
        return;
      }

      const tempCelsius = (data.main.temp - 273.15).toFixed(0);
      setTemperature(Number(tempCelsius));
      setHumidity(data.main.humidity);
      setError("");
    } catch (error) {
      setError(error.message || "Error al obtener los datos del clima");
      setTemperature(null);
      setHumidity(null);
    }
  };

  useEffect(() =>{
    if (location.trim())
      fetchWeatherData(location);
  }, [location]);

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
        <input className="input-weather" onChange={handleChange} value={location} type="text" />
        <button type="submit">Search</button>
      </form>
      {error && <p className="p-error">{error}</p>}
      {temperature && (
       <WeatherInfo  location={location} temperature={temperature} humidity={humidity}/>
      )}
    </div>
  );
}
export default App;
