import { useEffect, useState } from "react";
import Title from "./Title";
import weatherApi from "../api/weather";

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null);

    function kelvinToCelcius(kelvin) {
        const celsius = kelvin - 273.15;
        return celsius.toFixed(1); // One decimal
    }

    const fetchForecast = async () => {
        try {
            const lat = country.latlng[0];
            const lon = country.latlng[1];
            const forecast = await weatherApi.forecast(lat, lon);
            setWeather(forecast);
        } catch (error) {
            console.error("Error fetching weathers:", error);
        }
    };

    // Fetch the weather data when the component mounts
    useEffect(() => {
        fetchForecast();
    }, []); // The empty dependency array makes this effect run only once when the component mounts

    // Display weather information if available
    if (!weather) return;
    const { capital } = country;
    const temperature = kelvinToCelcius(weather.main.temp);
    return (
        <section>
            <Title text={`Weather in ${capital}`} headingLevel="h3" />
            <p>Temperature: {temperature} Celcius</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Summary: {weather.weather[0].description}</p>
        </section>
    );
};

export default Weather;
