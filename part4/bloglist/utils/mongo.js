const mongoose = require("mongoose");
const Blog = require("../models/blog");
require("dotenv").config();

exports.fetchBlogs = () => Blog.find({});
exports.fetchBlogById = (id) => Blog.findById(id);
exports.saveBlog = (blog) => new Blog(blog).save();
exports.deleteBlogById = (id) => Blog.findByIdAndDelete(id);
exports.connectDatabase = () => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const mongoClusterUrl = process.env.MONGO_URL;
    const table = "bloglist";
    const mongoUrl = `mongodb+srv://${username}:${password}@${mongoClusterUrl}/${table}?retryWrites=true&w=majority`;

    return mongoose
        .connect(mongoUrl)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
};
