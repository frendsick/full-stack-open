const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const mongoClusterUrl = process.env.MONGO_URL;
const table = "bloglist";
const mongoUrl = `mongodb+srv://${username}:${password}@${mongoClusterUrl}/${table}?retryWrites=true&w=majority`;

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

exports.fetchBlogs = () => Blog.find({});
exports.fetchBlogById = (id) => Blog.findById(id);
exports.saveBlog = (blog) => new Blog(blog).save();
exports.deleteBlogById = (id) => Blog.findByIdAndDelete(id);
exports.connectDatabase = () => {
    return mongoose
        .connect(mongoUrl)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
};
