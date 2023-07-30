import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ setUserFunction }) => {
    // Input field states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Form handlers
    const handleLogin = async (event) => {
        event.preventDefault();

        // Do not allow empty values
        if (!username || !password) {
            window.alert("Missing username or password");
            return;
        }

        const loggedUser = await loginService.login(username, password);
        if (!loggedUser) {
            window.alert("Wrong username or password");
            return;
        }

        setUserFunction(loggedUser.token);
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
