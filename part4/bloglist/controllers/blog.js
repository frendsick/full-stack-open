const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const mongo = require("../utils/mongo");
const userConfig = { name: 1, username: 1 }; // Fields to show for User

const getBearerToken = (request) => {
    const authorization = request.get("authorization");
    const bearerStart = "Bearer ";
    if (authorization?.startsWith(bearerStart)) {
        return authorization.slice(bearerStart.length);
    }
    return null;
};

blogRouter.get("/", async (_, response) => {
    const blogs = await mongo.fetchAllBlogs().populate("user", userConfig);
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const bearerToken = getBearerToken(request);
    const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
    if (!decodedToken.id) return response.status(401).json({ error: "bearer token invalid" });

    const newBlog = request.body;
    const addedBlog = await mongo.saveBlog(newBlog);

    // Verify that the given User exists
    const userId = request.body.user;
    const existingUser = await mongo.fetchUserById(userId);
    if (!existingUser) {
        response.status(404).json({ error: `User with ID '${userId}' does not exist` });
        return;
    }

    // Append the Blog to relating User's blogs and return its information
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
