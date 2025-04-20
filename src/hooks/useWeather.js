import { useState, useEffect } from "react";
import { fetchWeatherData } from "../services/weatherService";

export const useWeather = (location, API_URL, API_KEY) => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      if (!location.trim()) {
        setError("Ingrese la ciudad");
        setTemperature(null);
        setHumidity(null);
        return;
      }
      try {
        const { temperature, humidity } = await fetchWeatherData(
          location,
          API_URL,
          API_KEY
        );
        setTemperature(temperature);
        setHumidity(humidity);
        setError("");
      } catch (err) {
        setError(err.message || "Error al obtener datos del clima");
        setTemperature(null);
        setHumidity(null);
      }
    };

    getWeather();
  }, [location, API_URL, API_KEY]);

  return { temperature, humidity, error };
};
