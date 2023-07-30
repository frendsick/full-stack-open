const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    url: {
        type: String,
        minlength: 5,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // User ID
});

const blogTransform = (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
};

blogSchema.set("toObject", { transform: blogTransform });
blogSchema.set("toJSON", { transform: blogTransform });

module.exports = mongoose.model("Blog", blogSchema);
