const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongo = require("../utils/mongo");
const config = require("./config");
const initialBlogs = config.mockBlogs;

async function sendMockBlogs() {
    await mongo.saveListOfBlogs(initialBlogs);
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

    test("as many as in the mock blogs", async () => {
        const response = await api.get("/api/blog");
        const blogs = response.body;
        expect(blogs.length).toBe(initialBlogs.length);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
