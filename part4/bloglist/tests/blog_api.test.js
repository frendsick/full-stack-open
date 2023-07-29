const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongo = require("../utils/mongo");
const config = require("./config");

beforeEach(async () => {
    await mongo.connectDatabase();
    await mongo.deleteAllBlogs();

    const initialNotes = config.mockBlogs;
    await mongo.saveBlog(initialNotes[0]);
    await mongo.saveBlog(initialNotes[1]);
});

test("api: blogs are returned as json", async () => {
    await api
        .get("/api/blog")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
    await mongoose.connection.close();
});
