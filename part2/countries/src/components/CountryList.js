import Country from "./Country";

const CountryList = ({ countries, filter }) => {
    if (countries === null) return;

    // Only show the countries which common name matches with the filter
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()),
    );
    if (filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>;
    if (filteredCountries.length === 0) return <p>The filter does not match any country</p>;
    if (filteredCountries.length === 1) return <Country country={filteredCountries[0]} />;
    return filteredCountries.map((country, index) => <p key={index}>{country.name.common}</p>);
};

export default CountryList;
