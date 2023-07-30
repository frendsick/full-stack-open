import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Title from "./components/Title";
import BlogList from "./components/BlogList";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

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
