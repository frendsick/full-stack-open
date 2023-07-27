import { useState } from 'react'
import Filter from './Filter';
import Header from './Header';
import Persons from './Persons';
import PersonForm from './PersonForm';

const Phonebook = ({ persons: initialPersons }) => {
  const [persons, setPersons] = useState([...initialPersons])
  const [nameFilter, setNameFilter] = useState('');

  // Phonebook should not contain two person with the same name (case insensitive)
  function nameExists(name) {
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase());
  }

  // Return a boolean depending on if the person was added or not
  function addPerson(person) {
    if (nameExists(person.name)) {
      alert(`${person.name} is already added to phonebook`)
      return false
    }
    setPersons((prevPersons) => [...prevPersons, person])
    return true
  };

  return (
    <article>
      <Header text="Phonebook" headingLevel="h1"></Header>
      <Filter filterState={nameFilter} setFilterState={setNameFilter} />
      <Header text="add a new" headingLevel="h2"></Header>
      <PersonForm addPersonFunction={addPerson} />
      <Header text="Numbers" headingLevel="h2"></Header>
      <Persons personList={persons} nameFilter={nameFilter} />
    </article>
  )
}

export default Phonebook
