import { useEffect, useState } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook';

const PERSON_DB_URL = 'http://localhost:3001/persons';

const App = () => {
  // Persons for the Phonebook
  const [persons, setPersons] = useState([]);

  async function getResponseData(url) {
    return axios
      .get(url)
      .then(response => response.data);
  }

  // Fetch the person data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const persons = await getResponseData(PERSON_DB_URL);
        setPersons(persons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array makes this effect run only once when the component mounts

  return <Phonebook persons={persons} />;
}

export default App
