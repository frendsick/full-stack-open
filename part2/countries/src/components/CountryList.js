import { useState } from "react";
import Country from "./Country";

const CountryList = ({ countries, filter }) => {
    const [highlightedCountry, setHighlightedCountry] = useState(null);
    if (countries === null) return;

    const handleCountryClick = (country) => {
        setHighlightedCountry(country);
    };

    // Only show the countries which common name matches with the filter
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()),
    );
    if (filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>;
    if (filteredCountries.length === 0) return <p>The filter does not match any country</p>;
    if (filteredCountries.length === 1) return <Country country={filteredCountries[0]} />;

    // List countries with a show button for the full information
    return (
        <>
            {filteredCountries.map((country, index) => {
                return (
                    <div key={index}>
                        {country.name.common}
                        &nbsp;
                        <button onClick={() => handleCountryClick(country)}>show</button>
                    </div>
                );
            })}
            {
                // Render Country only when a country is highlighted
                highlightedCountry && <Country country={highlightedCountry} />
            }
        </>
    );
};

export default CountryList;
