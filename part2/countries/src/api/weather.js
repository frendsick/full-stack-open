import axios from "axios";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/";

const forecast = (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const config = {
        url: `${WEATHER_API}/weather`,
        method: "get",
        params: {
            lat: lat,
            lon: lon,
            appid: apiKey,
        },
    };
    return axios(config).then((response) => response.data);
};

const exportedFunctions = { forecast };
export default exportedFunctions;
