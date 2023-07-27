import Person from "./Person";

const Persons = ({ personList, nameFilter }) =>
    personList
        .filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .map((person) => <Person key={person.id} name={person.name} number={person.number} />);

export default Persons;
