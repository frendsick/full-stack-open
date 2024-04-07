import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Title from "./components/Title";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import { LOGGED_USER_STORAGE } from "./common/constants";
import LogoutButton from "./components/LogoutButton";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState("success");

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_STORAGE);
        if (!loggedUserJSON) return;
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
    }, []);

    useEffect(() => {
        if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
    }, [user]);

    function showNotification(message, type = "success", delayMs = 3000) {
        setNotificationType(type);
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, delayMs);
    }

    if (user === null) {
        return (
            <div>
                <Title text="Log in to application" headingLevel="h2" />
                <Notification message={notification} type={notificationType} />
                <LoginForm setUserFunction={setUser} showNotification={showNotification} />
            </div>
        );
    }

    return (
        <div>
            <Title text="Blogs" headingLevel="h1" />

            <Notification message={notification} type={notificationType} />

            <span>{user.name} logged in</span>
            <LogoutButton setUserFunction={setUser} />

            <Title text="Create new" headingLevel="h2" />
            <BlogForm showNotification={showNotification} />

            <BlogList blogs={blogs} />
        </div>
    );
};

export default App;
