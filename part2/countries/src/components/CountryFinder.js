import { useState } from "react";
import Filter from "./Filter";

const CountryFinder = () => {
    const [countryFilter, setCountryFilter] = useState("");
    return (
        <article>
            <Filter filterState={countryFilter} setFilterState={setCountryFilter} />
        </article>
    );
};

export default CountryFinder;
