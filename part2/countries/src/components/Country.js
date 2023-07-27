import InfoLine from "./InfoLine";
import LanguageList from "./LanguageList";
import Title from "./Title";

const Country = ({ country }) => {
    const countryName = country.name.common;
    const capital = country.capital[0];
    const { area, languages } = country;
    return (
        <>
            <Title text={countryName} headingLevel="h2" />
            <table>
                <tbody>
                    <InfoLine property="capital" value={capital} />
                    <InfoLine property="area" value={area} />
                </tbody>
            </table>
            <LanguageList languages={languages} />
        </>
    );
};

export default Country;
