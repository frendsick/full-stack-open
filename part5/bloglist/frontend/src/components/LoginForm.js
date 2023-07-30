import { useState } from "react";

const LoginForm = () => {
    // Input field states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Form handlers
    const handleLogin = (event) => {
        event.preventDefault();

        // Do not allow empty values
        if (!username || !password) {
            window.alert("Missing username or password");
            return;
        }

        // TODO: Login logic
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
