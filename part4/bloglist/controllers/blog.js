const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");

blogRouter.get("/", (_, response) => {
    mongo.fetchBlogs().then((blogs) => response.json(blogs));
});

blogRouter.post("/", (request, response, next) => {
    return mongo
        .saveBlog(request.body)
        .then((blog) => response.status(201).json(blog))
        .catch((error) => next(error));
});

module.exports = blogRouter;
