const usersRouter = require("express").Router();
const mongo = require("../utils/mongo");
const bcrypt = require("bcryptjs");
const blogConfig = { title: 1, author: 1, url: 1 }; // Fields to show for related Blogs
const { PASSWORD_MIN_LENGTH, PASSWORD_SALT_ROUNDS } = require("../common/constants");

usersRouter.get("/", async (_, response) => {
    const users = await mongo.fetchAllUsers().populate("blogs", blogConfig);
    response.json(users);
});

usersRouter.post("/", async (request, response) => {
    const { name, username, password } = request.body;
    if (!password) {
        response.status(400).json({ error: "Missing password" });
        return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
        response.status(400).json({ error: "The password must be at least 3 characters" });
        return;
    }

    // Create new user and return it's information
    const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    const newUser = { name, username, passwordHash };
    const addedUser = await mongo.saveUser(newUser);
    const populatedUser = await addedUser.populate("blogs", blogConfig);
    response.status(201).json(populatedUser);
});

usersRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const user = await mongo.fetchUserById(id);
    const populatedUser = await user.populate("blogs", blogConfig);
    response.json(populatedUser);
});

usersRouter.put("/:id", async (request, response) => {
    const id = request.params.id;
    const updatedFields = request.body;

    if ("password" in updatedFields) {
        const password = updatedFields.password;
        if (password.length < PASSWORD_MIN_LENGTH) {
            response.status(400).json({ error: "The password must be at least 3 characters" });
            return;
        }

        const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
        delete updatedFields.password;
        updatedFields.passwordHash = passwordHash;
    }

    const updatedUser = await mongo.updateUser(id, updatedFields);
    const populatedUser = await updatedUser.populate("blogs", blogConfig);
    response.json(populatedUser);
});

usersRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await mongo.deleteUserById(id);
    response.status(204).end();
});

module.exports = usersRouter;
