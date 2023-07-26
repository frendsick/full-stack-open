import { useState } from 'react'
import Header from './components/Header';
import Person from './components/Person';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [nameFilter, setNameFilter] = useState('');
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  // Phonebook should not contain two person with the same name (case insensitive)
  function nameExists(name) {
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase());
  }

  function addPerson(person) {
    if (nameExists(person.name)) {
      alert(`${person.name} is already added to phonebook`)
      return
    }
    setPersons([...persons, person]);
  };

  return (
    <article>
      <Header text="Phonebook" headingLevel="h1"></Header>
      <form>
        <div>
          filter shown with <input value={nameFilter} onChange={handleFilterChange} />
        </div>
      </form>
      <Header text="add a new" headingLevel="h2"></Header>
      <PersonForm addPersonFunction={addPerson} />
      <Header text="Numbers" headingLevel="h2"></Header>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
          .map((person) =>
            <Person key={person.id} name={person.name} number={person.number} />
          )
      }
    </article>
  )
}

export default App
