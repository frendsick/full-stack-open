const usersRouter = require("express").Router();
const mongo = require("../utils/mongo");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

usersRouter.get("/", async (_, response) => {
    const users = await mongo.fetchAllUsers();
    response.json(users);
});

usersRouter.post("/", async (request, response) => {
    const { name, username, password } = request.body;
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

    // TODO: Password change
    const updatedUser = await mongo.updateUser(id, updatedFields);
    response.json(updatedUser);
});

usersRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await mongo.deleteUserById(id);
    response.status(204).end(); // Person was deleted
});

module.exports = usersRouter;
