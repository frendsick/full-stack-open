import axios from "axios";
import { LOGGED_USER_STORAGE } from "../common/constants";

const baseUrl = "/api/blogs";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (blog) => {
    const currentUser = JSON.parse(window.localStorage.getItem(LOGGED_USER_STORAGE));
    const authorization = { Authorization: `Bearer ${currentUser.token}` };
    return axios
        .post(baseUrl, blog, { headers: authorization })
        .then((response) => response.data)
        .catch((error) => {
            console.error("An error occurred:", error.message);
            throw error;
        });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
