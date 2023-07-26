import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Person from './components/Person'

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

  // Input field onChange functions
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault(); // Do not submit the form
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
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return (
            <Person key={person.id} name={person.name} number={person.number} />
          )
        })
      }
    </div>
  )
}

export default App
