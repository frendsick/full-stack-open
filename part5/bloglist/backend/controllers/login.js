const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const validPassword = user.isValidPassword(password);

    if (!(user && validPassword)) {
        return response.status(401).json({
            error: "invalid username or password",
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const hourInSeconds = 60 * 60;
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: hourInSeconds });
    response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
