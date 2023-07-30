const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const enableUpdateValidator = { runValidators: true };
require("dotenv").config();

// Blogs
exports.fetchAllBlogs = () => Blog.find({});
exports.fetchBlogById = (id) => Blog.findById(id);
exports.saveBlog = (blog) => new Blog(blog).save();
exports.saveListOfBlogs = (blogs) => Blog.insertMany(blogs);
exports.deleteBlogById = (id) => Blog.findByIdAndDelete(id);
exports.deleteAllBlogs = () => Blog.deleteMany({});
exports.updateBlog = async (id, updatedFields) => {
    await Blog.findByIdAndUpdate(id, updatedFields, enableUpdateValidator);
    const updatedBlog = await Blog.findById(id);
    return updatedBlog;
};

// Users
exports.fetchAllUsers = () => User.find({});
exports.fetchUserById = (id) => User.findById(id);
exports.saveUser = (user) => new User(user).save();
exports.saveListOfUsers = (users) => User.insertMany(users);
exports.deleteUserById = (id) => User.findByIdAndDelete(id);
exports.deleteAllUsers = () => User.deleteMany({});
exports.addBlogToUser = (id, blog) =>
    User.findByIdAndUpdate(id, { $push: { blogs: blog.id } }, { new: true });
exports.updateUser = async (id, updatedFields) => {
    await User.findByIdAndUpdate(id, updatedFields, enableUpdateValidator);
    const updatedUser = await User.findById(id);
    return updatedUser;
};
exports.connectDatabase = (databaseName) => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const mongoClusterUrl = process.env.MONGO_URL;
    const mongoUrl = `mongodb+srv://${username}:${password}@${mongoClusterUrl}/${databaseName}?retryWrites=true&w=majority`;

    return mongoose
        .connect(mongoUrl)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
};
