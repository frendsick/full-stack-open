import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
    const user = {
        username,
        password,
    };
    const response = await axios.post(`${baseUrl}`, user);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
