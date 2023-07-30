const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");

blogRouter.get("/", (_, response) => {
    mongo.fetchAllBlogs().then((blogs) => response.json(blogs));
});

blogRouter.post("/", (request, response, next) => {
    return mongo
        .saveBlog(request.body)
        .then((blog) => response.status(201).json(blog))
        .catch((error) => next(error));
});

blogRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id;
    await mongo.deleteBlogById(id);
    response.status(204).end(); // Person was deleted
});

module.exports = blogRouter;
