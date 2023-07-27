import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import Filter from "./Filter";
import countryApi from "../api/countries";

const CountryFinder = () => {
    const [countries, setCountries] = useState(null);
    const [countryFilter, setCountryFilter] = useState("");

    const fetchCountries = async () => {
        try {
            const newCountries = await countryApi.getAll();
            setCountries(newCountries);
        } catch (error) {
            console.error("Error fetching countries:", error);
            setCountries([]); // Avoid null references
        }
    };

    // Fetch countries when the component loads
    useEffect(() => {
        fetchCountries();
    }, []); // The empty dependency array makes this effect run only once when the component mounts

    return (
        <article>
            <Filter filterState={countryFilter} setFilterState={setCountryFilter} />
            <CountryList countries={countries} filter={countryFilter} />
        </article>
    );
};

export default CountryFinder;
