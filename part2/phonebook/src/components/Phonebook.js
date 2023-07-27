import { useEffect, useState } from "react";
import Filter from "./Filter";
import Header from "./Header";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import personApi from "../api/person";

const Phonebook = () => {
    const [persons, setPersons] = useState(null);
    const [nameFilter, setNameFilter] = useState("");

    const fetchData = async () => {
        try {
            const newPersons = await personApi.getAll();
            setPersons(newPersons);
        } catch (error) {
            console.error("Error fetching persons:", error);
            setPersons([]); // Avoid null references
        }
    };

    // Fetch the person data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // The empty dependency array makes this effect run only once when the component mounts

    // string | null
    function getPersonIdByName(name) {
        const person = persons.find((person) => person.name.toLowerCase() === name.toLowerCase());
        return person ? person.id : null;
    }

    // Phonebook should not contain two person with the same name (case insensitive)
    async function nameExists(name) {
        await fetchData(); // Make sure that current database information is used
        return (
            persons && persons.some((person) => person.name.toLowerCase() === name.toLowerCase())
        );
    }

    // Return a boolean depending on if the phone number was changed
    async function updatePhoneNumber(person) {
        const name = person.name;
        const changePhoneNumber = !window.confirm(
            `${name} is already added to phonebook, replace the old number with a new one?`,
        );
        if (changePhoneNumber) return false;

        // Get the user ID for the person with the same name
        const userId = getPersonIdByName(name);
        if (!userId) return false;

        // Update phone number and redraw
        await personApi.update(userId, person);
        fetchData();
        return true;
    }

    // Return a boolean depending on if the person was added
    async function addPerson(person) {
        if (nameExists(person.name)) {
            return updatePhoneNumber(person);
        }
        personApi.create(person);
        setPersons((prevPersons) => [...prevPersons, person]);
        return true;
    }

    async function deletePerson(person) {
        // Delete the person only if the user confirms it
        if (!window.confirm(`Delete ${person.name}?`)) return;
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
            {persons === null ? (
                <div>Loading...</div>
            ) : persons.length === 0 ? (
                <div>Phonebook is empty.</div>
            ) : (
                <Persons
                    personList={persons}
                    nameFilter={nameFilter}
                    deletePersonFunction={deletePerson}
                />
            )}
        </article>
    );
};

export default Phonebook;
