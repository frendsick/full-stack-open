import axios from "axios";
const COUNTRY_API = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => axios.get(`${COUNTRY_API}/all`).then((response) => response.data);

const exportedFunctions = { getAll };
export default exportedFunctions;
