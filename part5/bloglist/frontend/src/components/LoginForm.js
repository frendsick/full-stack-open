import { useState } from "react";
import loginService from "../services/login";
import { LOGGED_USER_STORAGE } from "../common/constants";

const LoginForm = ({ setUserFunction, showNotification }) => {
    // Input field states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Form handlers
    const handleLogin = async (event) => {
        event.preventDefault();

        // Do not allow empty values
        if (!username || !password)
            return showNotification("Missing username or password", "error");

        const loggedUser = await loginService.login(username, password);
        if (!loggedUser) return showNotification("Wrong username or password", "error");

        // Save the session token on the React state and the session storage
        window.localStorage.setItem(LOGGED_USER_STORAGE, JSON.stringify(loggedUser));
        setUserFunction(loggedUser);
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                username{" "}
                <input value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div>
                password{" "}
                <input value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div>
                <button type="submit">login</button>
            </div>
        </form>
    );
};

export default LoginForm;
