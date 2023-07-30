const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");

blogRouter.get("/", async (_, response) => {
    const blogs = await mongo.fetchAllBlogs();
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const newBlog = request.body;
    const addedBlog = await mongo.saveBlog(newBlog);
    response.status(201).json(addedBlog);
});

blogRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const blog = await mongo.fetchBlogById(id);
    response.json(blog);
});

blogRouter.put("/:id", async (request, response) => {
    const id = request.params.id;
    const updatedFields = request.body;
    const updatedBlog = await mongo.updateBlog(id, updatedFields);
    response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id;
    await mongo.deleteBlogById(id);
    response.status(204).end(); // Person was deleted
});

module.exports = blogRouter;
