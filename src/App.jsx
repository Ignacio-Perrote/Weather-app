import { useState } from "react";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [location, setLocation] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const { temperature, humidity, error } = useWeather(location, API_URL, API_KEY);

  const handleSubmit = (e) => {
    e.preventDefault();
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
