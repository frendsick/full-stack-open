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

describe("blog creation", () => {
    test("likes is set to zero when it was not defined", async () => {
        const blogWithoutLikes = {
            title: "The best blog ever",
            author: "Chad Giga",
            url: "http://example.com",
        };
        const response = await api.post(BLOG_API_URL).send(blogWithoutLikes);
        const newBlog = response.body;
        expect(newBlog.likes).toBe(0);
    });

    test("when required field is missing return bad request", async () => {
        const blogWithoutTitle = {
            author: "Chad Giga",
            url: "http://example.com",
        };
        const blogWithoutUrl = {
            title: "The best blog ever",
            author: "Chad Giga",
        };
        await api.post(BLOG_API_URL).send(blogWithoutTitle).expect(400);
        await api.post(BLOG_API_URL).send(blogWithoutUrl).expect(400);
    });
});

describe("blog updation", () => {
    test("changes the record in the database", async () => {
        const blogsAtStart = await mongo.fetchAllBlogs();
        const blogToUpdate = blogsAtStart[0];
        const updatedFields = {
            title: "The best blog ever",
            author: "Chad Giga",
        };
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedFields).expect(200);

        const mergedObject = { ...blogToUpdate.toObject(), ...updatedFields };
        const updatedBlog = await mongo.fetchBlogById(blogToUpdate.id);
        expect(updatedBlog.toObject()).toEqual(mergedObject);
    });

    test("cannot update nonexistent blog", async () => {
        const blogsAtStart = await mongo.fetchAllBlogs();
        const nonexistentId = "1337";
        const updatedFields = { title: "The best blog ever" };
        await api.put(`/api/blogs/${nonexistentId}`).send(updatedFields).expect(404);

        // Blog is not updated
        const blogsAtEnd = await mongo.fetchAllBlogs();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
});

describe("blog deletion", () => {
    test("deleted blog does not exist in the database", async () => {
        const blogsAtStart = await mongo.fetchAllBlogs();
        const blogToDelete = blogsAtStart[0];
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await mongo.fetchAllBlogs();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

        const blogIds = blogsAtEnd.map((blog) => blog.id);
        expect(blogIds).not.toContain(blogToDelete.id);
    });

    test("cannot delete nonexistent blog", async () => {
        const blogsAtStart = await mongo.fetchAllBlogs();
        const nonexistentId = "1337";
        await api.delete(`/api/blogs/${nonexistentId}`).expect(404);

        // Blog is not deleted
        const blogsAtEnd = await mongo.fetchAllBlogs();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
