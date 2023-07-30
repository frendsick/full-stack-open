const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
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

// Extracts Bearer token from Authorization header
app.use(middleware.tokenExtractor);

// Extracts user information from Bearer token
app.use(middleware.userExtractor);

// Routers
app.use("/api/blogs", blogRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

// Custom error handler middleware
app.use(middleware.errorHandler);

module.exports = app;
