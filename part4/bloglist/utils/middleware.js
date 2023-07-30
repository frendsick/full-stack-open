const errorHandler = (err, _, res, next) => {
    console.error("Error:", err.message);
    switch (err.name) {
        case "CastError":
            return res.status(404).send({ error: "Unknown blog ID" });
        case "JsonWebTokenError":
            return res.status(401).send({ error: err.message });
        case "ValidationError":
            return res.status(400).send({ error: err.message });
    }
    res.status(500).json({ error: "Unknown error" });
    next(err);
};

module.exports = {
    errorHandler,
};
