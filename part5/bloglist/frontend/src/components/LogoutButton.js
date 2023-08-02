import { LOGGED_USER_STORAGE } from "../common/constants";

const LogoutButton = ({ setUserFunction }) => {
    const handleLogout = async (event) => {
        event.preventDefault();

        // Save the session token on the React state and the session storage
        window.localStorage.removeItem(LOGGED_USER_STORAGE);
        setUserFunction(null);
    };
    return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
