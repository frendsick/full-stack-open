const usersRouter = require("express").Router();
const mongo = require("../utils/mongo");
const bcrypt = require("bcrypt");

const PASSWORD_MIN_LENGTH = 3;
const SALT_ROUNDS = 10;

usersRouter.get("/", async (_, response) => {
    const users = await mongo.fetchAllUsers();
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

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = { name, username, passwordHash };
    const addedUser = await mongo.saveUser(newUser);
    response.status(201).json(addedUser);
});

usersRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const user = await mongo.fetchUserById(id);
    response.json(user);
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

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        delete updatedFields.password;
        updatedFields.passwordHash = passwordHash;
    }
    const updatedUser = await mongo.updateUser(id, updatedFields);
    response.json(updatedUser);
});

usersRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await mongo.deleteUserById(id);
    response.status(204).end();
});

module.exports = usersRouter;
