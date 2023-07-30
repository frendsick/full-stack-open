const mongoose = require("mongoose");
const Blog = require("../models/blog");
const enableUpdateValidator = { runValidators: true };
require("dotenv").config();

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
exports.connectDatabase = (table) => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const mongoClusterUrl = process.env.MONGO_URL;
    const mongoUrl = `mongodb+srv://${username}:${password}@${mongoClusterUrl}/${table}?retryWrites=true&w=majority`;

    return mongoose
        .connect(mongoUrl)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
};
