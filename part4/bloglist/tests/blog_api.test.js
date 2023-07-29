const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongo = require("../utils/mongo");
const config = require("./config");

async function sendMockBlogs() {
    const initialNotes = config.mockBlogs;
    await mongo.saveBlog(initialNotes[0]);
    await mongo.saveBlog(initialNotes[1]);
}

beforeEach(async () => {
    await mongo.connectDatabase();
    await mongo.deleteAllBlogs();
    await sendMockBlogs();
});

test("api: blogs are returned as json", async () => {
    await api
        .get("/api/blog")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

describe("total blogs", () => {
    test("zero when the database is empty", async () => {
        await mongo.deleteAllBlogs();
        const response = await api.get("/api/blog");
        const blogs = response.body;
        expect(blogs).toBeInstanceOf(Array);
        expect(blogs.length).toBe(0);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
