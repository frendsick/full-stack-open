import { useEffect, useState } from "react";
import Filter from "./Filter";
import Header from "./Header";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import personApi from "../api/person";

const Phonebook = () => {
    const [persons, setPersons] = useState([]);
    const [nameFilter, setNameFilter] = useState("");

    const fetchData = async () => {
        try {
            const newPersons = await personApi.getAll();
            setPersons([...newPersons]);
            console.log(persons);
        } catch (error) {
            console.error("Error fetching persons:", error);
        }
    };

    // Fetch the person data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // The empty dependency array makes this effect run only once when the component mounts

    // Phonebook should not contain two person with the same name (case insensitive)
    function nameExists(name) {
        return persons.some((person) => person.name.toLowerCase() === name.toLowerCase());
    }

    // Return a boolean depending on if the person was added or not
    function addPerson(person) {
        if (nameExists(person.name)) {
            alert(`${person.name} is already added to phonebook`);
            return false;
        }
        personApi.create(person);
        setPersons((prevPersons) => [...prevPersons, person]);
        return true;
    }

    async function deletePerson(person) {
        try {
            await personApi.remove(person.id);
            fetchData();
        } catch (error) {
            console.error(`Error deleting person with ID ${person.id}`, error);
        }
    }

    return (
        <article>
            <Header text="Phonebook" headingLevel="h1"></Header>
            <Filter filterState={nameFilter} setFilterState={setNameFilter} />
            <Header text="add a new" headingLevel="h2"></Header>
            <PersonForm addPersonFunction={addPerson} />
            <Header text="Numbers" headingLevel="h2"></Header>
            <Persons
                personList={persons}
                nameFilter={nameFilter}
                deletePersonFunction={deletePerson}
            />
        </article>
    );
};

export default Phonebook;
