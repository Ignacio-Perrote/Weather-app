import PropTypes from "prop-types";

const WeatherInfo = ({ location, temperature, humidity }) => (
  <div className="weather-info">
    <h2 className="title-location">{location}</h2>
    <p className="p-condition">Temperature: {temperature}°C</p>
    <p className="p-condition">Humidity: {humidity}%</p>
  </div>
);

WeatherInfo.propTypes = {
  location: PropTypes.string.isRequired,
  temperature: PropTypes.number,
  humidity: PropTypes.number,
};

export default WeatherInfo;
