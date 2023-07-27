import Title from "./Title";

const LanguageList = ({ languages }) => {
    if (languages.length === 0) return;
    return (
        <>
            <Title text="Languages" headingLevel="h3" />
            <ul>
                {Object.entries(languages).map(([key, language]) => (
                    <li key={key}>{language}</li>
                ))}
            </ul>
        </>
    );
};

export default LanguageList;
