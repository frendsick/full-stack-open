const express = require("express");
const app = express();
const blogRouter = require("./controllers/blog");
const cors = require("cors");

// Allow requests from other origins
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/blog", blogRouter);

module.exports = app;
