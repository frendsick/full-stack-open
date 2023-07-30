const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongo = require("../utils/mongo");
const config = require("./config");
const initialUsers = config.mockUsers;
const { USERS_API_URL, PASSWORD_SALT_ROUNDS } = require("../common/constants");

async function sendUsers(users) {
    const usersCopy = JSON.parse(JSON.stringify(users)); // Create deep copy

    // Hash the password to passwordHash field
    for (let i = 0; i < usersCopy.length; i++) {
        const password = usersCopy[i].password;
        const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
        delete usersCopy[i].password;
        usersCopy[i].passwordHash = passwordHash;
    }
    await mongo.saveListOfUsers(usersCopy);
}

beforeEach(async () => {
    await mongo.connectDatabase();
    await mongo.deleteAllUsers();
    await sendUsers(initialUsers);
});

describe("number of users", () => {
    test("zero when the database is empty", async () => {
        await mongo.deleteAllUsers();
        const response = await api.get(USERS_API_URL);
        const users = response.body;
        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBe(0);
    });

    test("as many as in the mock users", async () => {
        const response = await api.get(USERS_API_URL);
        const users = response.body;
        expect(users.length).toBe(initialUsers.length);
    });

    test("grows when new user is added", async () => {
        const newUser = {
            name: "Lil Wayne",
            username: "wayner",
            password: "uwillnevergu3ss",
        };
        await api.post(USERS_API_URL).send(newUser);
        const response = await api.get(USERS_API_URL);
        const users = response.body;
        expect(users.length).toBe(initialUsers.length + 1);
    });
});

describe("user creation", () => {
    test("when required field is missing return bad request", async () => {
        const userWithoutUsername = {
            name: "Lil Wayne",
            password: "uwillnevergu3ss",
        };
        const userWithoutPassword = {
            name: "Lil Wayne",
            username: "wayner",
        };
        await api.post(USERS_API_URL).send(userWithoutUsername).expect(400);
        await api.post(USERS_API_URL).send(userWithoutPassword).expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
