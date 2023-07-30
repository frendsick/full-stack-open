const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
});

const userTransform = (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
};

userSchema.set("toObject", { transform: userTransform });
userSchema.set("toJSON", { transform: userTransform });
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
