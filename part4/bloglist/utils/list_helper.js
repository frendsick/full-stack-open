const lodash = require("lodash");

// Exercise 4.3.
const dummy = () => {
    return 1;
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    return lodash.maxBy(blogs, "likes");
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const blogCounts = lodash.groupBy(blogs, "author");
    const authorsWithBlogCounts = lodash.map(blogCounts, (blogs, author) => ({
        author,
        blogs: blogs.length,
    }));
    return lodash.maxBy(authorsWithBlogCounts, "blogs");
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    const blogCounts = lodash.groupBy(blogs, "author");
    const authorsWithLikeCounts = lodash.map(blogCounts, (blogs, author) => ({
        author,
        likes: totalLikes(blogs),
    }));
    return lodash.maxBy(authorsWithLikeCounts, "likes");
};

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
};

module.exports = {
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes,
};
