import axios from "axios";
const PERSON_API = "http://localhost:3001/persons";

const getAll = () => axios.get(PERSON_API).then((response) => response.data);
const create = (person) => axios.post(PERSON_API, person).then((response) => response.data);

const exportedFunctions = { getAll, create };
export default exportedFunctions;
