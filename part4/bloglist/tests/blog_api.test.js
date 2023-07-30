const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongo = require("../utils/mongo");
const config = require("./config");
const initialBlogs = config.mockBlogs;
const BLOG_API_URL = "/api/blogs";

async function sendMockBlogs() {
    await mongo.saveListOfBlogs(initialBlogs);
}

beforeEach(async () => {
    await mongo.connectDatabase();
    await mongo.deleteAllBlogs();
    await sendMockBlogs();
});

describe("data characteristics", () => {
    test("blogs are returned as json", async () => {
        await api
            .get(BLOG_API_URL)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("blog contains id field", async () => {
        const response = await api.get(BLOG_API_URL);
        const blogs = response.body;
        const firstBlog = blogs[0];
        expect(firstBlog.id).toBeDefined();
    });
});

describe("number of blogs", () => {
    test("zero when the database is empty", async () => {
        await mongo.deleteAllBlogs();
        const response = await api.get(BLOG_API_URL);
        const blogs = response.body;
        expect(blogs).toBeInstanceOf(Array);
        expect(blogs.length).toBe(0);
    });

    test("as many as in the mock blogs", async () => {
        const response = await api.get(BLOG_API_URL);
        const blogs = response.body;
        expect(blogs.length).toBe(initialBlogs.length);
    });

    test("grows when new blog is added", async () => {
        await mongo.saveBlog(initialBlogs[0]);
        const response = await api.get(BLOG_API_URL);
        const blogs = response.body;
        expect(blogs.length).toBe(initialBlogs.length + 1);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
