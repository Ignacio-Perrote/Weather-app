 
 export const fetchWeatherData = async (cityName, API_URL, API_KEY) => {
 
 const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}`);
      const data = await response.json();

      if (!data.main) {
        throw new Error("Ciudad no encontrada");
      }
    
      const tempCelsius = (data.main.temp - 273.15).toFixed(0);
      return {
        temperature: tempCelsius,
        humidity: data.main.humidity,
      };
    }