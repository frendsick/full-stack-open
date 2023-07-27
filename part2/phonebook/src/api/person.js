import axios from "axios";
const PERSON_API = "http://localhost:3001/persons";

const getAll = () => axios.get(PERSON_API).then((response) => response.data);
const create = (person) => axios.post(PERSON_API, person).then((response) => response.data);
const remove = (personId) => axios.delete(`${PERSON_API}/${personId}`);

const exportedFunctions = { getAll, create, remove };
export default exportedFunctions;
