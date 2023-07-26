import { useState } from 'react'
import Filter from './components/Filter';
import Header from './components/Header';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
