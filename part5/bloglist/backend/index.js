const app = require("./app");
const mongo = require("./utils/mongo");

const DATABASE_NAME = process.env.NODE_ENV === "test" ? "test-bloglist" : "bloglist";

async function main() {
    await mongo.connectDatabase(DATABASE_NAME);
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

main();
