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

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
};

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes,
};
