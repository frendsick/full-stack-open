const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");

blogRouter.get("/", (_, response) => {
    mongo.fetchBlogs().then((blogs) => response.json(blogs));
});

blogRouter.post("/", (request, response) =>
    mongo.saveBlog(request.body).then((blog) => response.status(201).json(blog)),
);

module.exports = blogRouter;
