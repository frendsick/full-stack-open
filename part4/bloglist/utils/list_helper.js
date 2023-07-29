const lodash = require("lodash");

// Exercise 4.3.
const dummy = (blogs) => {
    return 1;
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    return blogs.reduce((maxLikesBlog, blog) => {
        return blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog;
    }, blogs[0]);
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const blogCounts = lodash.groupBy(blogs, "author");
    console.log(blogCounts);
    const authorsWithBlogCounts = lodash.map(blogCounts, (blogs, author) => ({
        author,
        blogs: blogs.length,
    }));
    console.log(authorsWithBlogCounts);
    const topAuthorInfo = lodash.maxBy(authorsWithBlogCounts, "blogs");
    console.log(topAuthorInfo);

    return topAuthorInfo;
};

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
};

module.exports = {
    dummy,
    favoriteBlog,
    mostBlogs,
    totalLikes,
};
