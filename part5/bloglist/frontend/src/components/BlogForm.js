import { useState } from "react";
import blogService from "../services/blogs";
import { LOGGED_USER_STORAGE } from "../common/constants";

const BlogForm = ({ showNotification }) => {
    // Input fieldnvim-tree states
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    // Form handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        const currentUser = JSON.parse(window.localStorage.getItem(LOGGED_USER_STORAGE));
        const blog = {
            title: title,
            author: author,
            url: url,
            user: currentUser.id,
        };

        // Create the blog
        try {
            await blogService.create(blog);
            showNotification(`A new blog ${title} by ${author} added`);
        } catch (error) {
            showNotification("Could not create blog", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                title:
                <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
                author:
                <input value={author} onChange={(event) => setAuthor(event.target.value)} />
            </div>
            <div>
                url:
                <input value={url} onChange={(event) => setUrl(event.target.value)} />
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    );
};

export default BlogForm;
