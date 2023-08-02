import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Title from "./components/Title";
import BlogList from "./components/BlogList";
import { LOGGED_USER_STORAGE } from "./common/constants";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_STORAGE);
        if (!loggedUserJSON) return;
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
    }, []);

    useEffect(() => {
        if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
    }, [user]);

    if (user === null) {
        return (
            <div>
                <Title text="Log in to application" headingLevel="h2" />
                <LoginForm setUserFunction={setUser} />
            </div>
        );
    }

    return (
        <div>
            <h2>Blogs</h2>
            <BlogList blogs={blogs} />
        </div>
    );
};

export default App;
