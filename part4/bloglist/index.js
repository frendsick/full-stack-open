const express = require("express");
const app = express();
const cors = require("cors");
const { connectDatabase, fetchBlogs, saveBlog } = require("./mongo");

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (_, response) => {
    fetchBlogs().then((blogs) => response.json(blogs));
});

app.post("/api/blogs", (request, response) =>
    saveBlog(request.body).then((blog) => response.status(201).json(blog)),
);

connectDatabase().then(() => {
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
