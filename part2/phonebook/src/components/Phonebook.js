import { useEffect, useState } from "react";
import Filter from "./Filter";
import Header from "./Header";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import personApi from "../api/person";
import Notification from "./Notification";

const Phonebook = () => {
    const [persons, setPersons] = useState(null);
    const [nameFilter, setNameFilter] = useState("");
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState("success");

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

    // Show notification for the duration of the delay
    function showNotification(message, type = "success", delayMs = 3000) {
        setNotificationType(type);
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, delayMs);
    }

    // Return a boolean depending on if the phone number was changed
    async function updatePhoneNumber(person) {
        const { name, number } = person;
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
        showNotification(`The number of ${name} was changed to ${number}`);
        return true;
    }

    // Return a boolean depending on if the person was added
    async function addPerson(person) {
        if (await nameExists(person.name)) {
            return updatePhoneNumber(person);
        }
        personApi.create(person);
        setPersons((prevPersons) => [...prevPersons, person]);
        showNotification(`Added ${person.name}`);
        return true;
    }

    async function deletePerson(person) {
        const { name, id } = person;
        // Delete the person only if the user confirms it
        if (!window.confirm(`Delete ${name}?`)) return;
        await personApi
            .remove(id)
            .then(showNotification(`Deleted ${name}`))
            .catch(() =>
                showNotification(
                    `Information of ${name} has already been removed from server`,
                    "error",
                ),
            );
        fetchData();
    }

    return (
        <article>
            <Header text="Phonebook" headingLevel="h1"></Header>
            <Notification message={notification} type={notificationType} />
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
