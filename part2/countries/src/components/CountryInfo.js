import InfoLine from "./InfoLine";
import LanguageList from "./LanguageList";

const CountryInfo = ({ country }) => {
    const capital = country.capital[0];
    const { area, languages } = country;
    return (
        <>
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

export default CountryInfo;
