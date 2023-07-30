import axios from "axios";
const baseUrl = "/api/login";

const login = (username, password) => {
    const user = { username, password };
    return axios
        .post(`${baseUrl}`, user)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                console.error("Login failed: Invalid credentials");
                return null;
            } else {
                console.error("An error occurred:", error.message);
                throw error;
            }
        });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
