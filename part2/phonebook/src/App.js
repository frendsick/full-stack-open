import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // Input field states
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  // Input field onChange functions
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  // Phonebook should not contain two person with the same name (case insensitive)
  function nameExists(name) {
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase());
  }

  const addPerson = (event) => {
    event.preventDefault(); // Do not submit the form
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };
    setPersons([...persons, newPerson]);

    // Empty the input fields
    setNewName('');
    setNewNumber('');
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
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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
