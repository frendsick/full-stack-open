const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");

// Allow requests from other origins
app.use(cors());
app.use(express.json());

// Configure request logging with `morgan` middleware
const morgan = require("morgan");
morgan.token("body", function (req) {
    return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// Routers
app.use("/api/blogs", blogRouter);

// Custom error handler middleware
app.use(middleware.errorHandler);

module.exports = app;
