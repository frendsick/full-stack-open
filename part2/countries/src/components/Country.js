import CountryInfo from "./CountryInfo";
import Title from "./Title";
import Weather from "./Weather";

const Country = ({ country }) => {
    const countryName = country.name.common;
    return (
        <section>
            <Title text={countryName} headingLevel="h2" />
            <CountryInfo country={country} />
            <Weather country={country} />
        </section>
    );
};

export default Country;
