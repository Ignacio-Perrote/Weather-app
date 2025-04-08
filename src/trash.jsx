import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [location, setLocation] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async (cityName) => {
    try {
      console.log("Fetching data for", cityName,);
      const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}`);

      const data = await response.json();
      console.log(data);

      if (data.cod !== 200) {
        setError(`La ciudad "${cityName}" no existe.`);
        setHumidity(null);
        setWind(null);
        setTemperature(null);
        return;
      }
      const tempCelsius = (data.main.temp - 273.15).toFixed(0);
      setTemperature(Number(tempCelsius));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setError("");
    } catch (error) {
      setError(error.message || "Error al obtener los datos del clima");
      setHumidity(null);
      setTemperature(null);
    }
  };

  useEffect(() => {
    if (!location.trim())
    fetchWeatherData(location);
  }, [location]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Por favor ingrese una ciudad");
    }
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Weather map</h1>

        <input
          onChange={handleChange}
          type="text"
          placeholder="Valencia, Buenos Aires, Londres"
        />
        <button type="submit">Search</button>
      </form>
      <div className="weather-results">
        <h2>Resultados</h2>
        {temperature !== null && <p>Temperatura: {temperature}°C</p>}
        {humidity !== null && <p>Humedad: {humidity}%</p>}
        {wind !== null && <p>Viento: {wind} m/s</p>}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
