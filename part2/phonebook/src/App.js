import { useState } from 'react'
import Filter from './components/Filter';
import Header from './components/Header';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('');

  // Phonebook should not contain two person with the same name (case insensitive)
  function nameExists(name) {
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase());
  }

  function addPerson(person) {
    if (nameExists(person.name)) {
      alert(`${person.name} is already added to phonebook`)
      return
    }
    setPersons((prevPersons) => [...prevPersons, person])
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

export default App
