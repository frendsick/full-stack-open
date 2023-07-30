const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");

blogRouter.get("/", async (_, response) => {
    const blogs = await mongo.fetchAllBlogs();
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const blog = await mongo.saveBlog(request.body);
    response.status(201).json(blog);
});

blogRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const blog = await mongo.fetchBlogById(id);
    response.json(blog);
});

blogRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id;
    await mongo.deleteBlogById(id);
    response.status(204).end(); // Person was deleted
});

module.exports = blogRouter;
