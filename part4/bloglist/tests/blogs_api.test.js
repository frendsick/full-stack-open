const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongo = require("../utils/mongo");
const config = require("./config");
const { BLOGS_API_URL, USERS_API_URL } = require("../common/constants");
const initialBlogs = config.mockBlogs;

async function sendMockBlogs() {
    const mockUserId = "64c68250534ed48ad76db201";
    for (let i = 0; i < initialBlogs.length; i++) {
        initialBlogs[i].user = mockUserId;
    }
    await mongo.saveListOfBlogs(initialBlogs);
}

async function createMockUser() {
    await mongo.deleteAllUsers();
    const response = await api.post(USERS_API_URL).send(config.mockUsers[0]);
    return response.body;
}

async function getBearerToken(user) {
    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const hourInSeconds = 60 * 60;
    return jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: hourInSeconds });
}

beforeEach(async () => {
    await mongo.connectDatabase();
    await mongo.deleteAllBlogs();
    await sendMockBlogs();
});

describe("data characteristics", () => {
    test("blogs are returned as json", async () => {
        await api
            .get(BLOGS_API_URL)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("blog contains id field", async () => {
        const response = await api.get(BLOGS_API_URL);
        const blogs = response.body;
        const firstBlog = blogs[0];
        expect(firstBlog.id).toBeDefined();
    });
});

describe("number of blogs", () => {
    test("zero when the database is empty", async () => {
        await mongo.deleteAllBlogs();
        const response = await api.get(BLOGS_API_URL);
        const blogs = response.body;
        expect(blogs).toBeInstanceOf(Array);
        expect(blogs.length).toBe(0);
    });

    test("as many as in the mock blogs", async () => {
        const response = await api.get(BLOGS_API_URL);
        const blogs = response.body;
        expect(blogs.length).toBe(initialBlogs.length);
    });

    test("grows when new blog is added", async () => {
        await mongo.saveBlog(initialBlogs[0]);
        const response = await api.get(BLOGS_API_URL);
        const blogs = response.body;
        expect(blogs.length).toBe(initialBlogs.length + 1);
    });
});

describe("blog creation", () => {
    test("likes is set to zero when it was not defined", async () => {
        const mockUser = await createMockUser();
        const bearerToken = await getBearerToken(mockUser);
        const blogWithoutLikes = {
            title: "The best blog ever",
            author: "Chad Giga",
            url: "http://example.com",
            user: mockUser.id,
        };

        const response = await api
            .post(BLOGS_API_URL)
            .set({ Authorization: `Bearer ${bearerToken}` })
            .send(blogWithoutLikes);

        const newBlog = response.body;
        expect(newBlog.likes).toBe(0);
    });

    test("when required field is missing return bad request", async () => {
        const mockUser = await createMockUser();
        const bearerToken = await getBearerToken(mockUser);
        const blogWithoutTitle = {
            author: "Chad Giga",
            url: "http://example.com",
            user: mockUser.id,
        };
        const blogWithoutUrl = {
            title: "The best blog ever",
            author: "Chad Giga",
            user: mockUser.id,
        };
        const blogWithoutUser = {
            title: "The best blog ever",
            author: "Chad Giga",
            url: "http://example.com",
        };
        const authorization = { Authorization: `Bearer ${bearerToken}` };
        await api.post(BLOGS_API_URL).set(authorization).send(blogWithoutTitle).expect(400);
        await api.post(BLOGS_API_URL).set(authorization).send(blogWithoutUrl).expect(400);
        await api.post(BLOGS_API_URL).set(authorization).send(blogWithoutUser).expect(400);
    });
});

describe("blog updation", () => {
    test("with empty object does not change the blog", async () => {
        const blogsAtStart = await mongo.fetchAllBlogs();
        const blogToUpdate = blogsAtStart[0];
        const updatedFields = {};
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedFields).expect(200);

        // Blog is not updated
        const updatedBlog = await mongo.fetchBlogById(blogToUpdate.id);
        expect(updatedBlog).toEqual(blogToUpdate);
    });

    test("changes the record in the database", async () => {
        const blogsAtStart = await mongo.fetchAllBlogs();
        const blogToUpdate = blogsAtStart[0];
        const updatedFields = {
            title: "The best blog ever",
            likes: 1337,
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
        // Create blog owned by a mock user
        const mockUser = await createMockUser();
        const bearerToken = await getBearerToken(mockUser);
        mockBlog = config.mockBlogs[0];
        mockBlog.user = mockUser.id;
        const blogToDelete = await mongo.saveBlog(mockBlog);

        // Delete the blog owned by the mock user
        const blogsAtStart = await mongo.fetchAllBlogs();
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: `Bearer ${bearerToken}` })
            .expect(204);

        // Database has one less blog
        const blogsAtEnd = await mongo.fetchAllBlogs();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

        // Database does not contain the deleted blog
        const blogIds = blogsAtEnd.map((blog) => blog.id);
        expect(blogIds).not.toContain(blogToDelete.id);
    });

    test("cannot delete nonexistent blog", async () => {
        const mockUser = await createMockUser();
        const bearerToken = await getBearerToken(mockUser);
        const blogsAtStart = await mongo.fetchAllBlogs();
        const nonexistentId = "1337";
        await api
            .delete(`/api/blogs/${nonexistentId}`)
            .set({ Authorization: `Bearer ${bearerToken}` })
            .expect(404);

        // Blog is not deleted
        const blogsAtEnd = await mongo.fetchAllBlogs();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
