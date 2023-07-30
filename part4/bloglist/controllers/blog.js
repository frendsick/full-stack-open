const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");
const userConfig = { name: 1, username: 1 }; // Fields to show for User

blogRouter.get("/", async (_, response) => {
    const blogs = await mongo.fetchAllBlogs().populate("user", userConfig);
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const newBlog = request.body;
    const addedBlog = await mongo.saveBlog(newBlog);

    // Append the Blog to relating User's blogs
    const userId = request.body.user;
    await mongo.addBlogToUser(userId, addedBlog);

    const populatedBlog = await addedBlog.populate("user", userConfig);
    response.status(201).json(populatedBlog);
});

blogRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const blog = await mongo.fetchBlogById(id);
    const populatedBlog = await blog.populate("user", userConfig);
    response.json(populatedBlog);
});

blogRouter.put("/:id", async (request, response) => {
    const id = request.params.id;
    const updatedFields = request.body;
    const updatedBlog = await mongo.updateBlog(id, updatedFields);
    const populatedBlog = await updatedBlog.populate("user", userConfig);
    response.json(populatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await mongo.deleteBlogById(id);
    response.status(204).end();
});

module.exports = blogRouter;
