const app = require("./app");
const mongo = require("./utils/mongo");

const blogsTable = process.env.NODE_ENV === "test" ? "test-bloglist" : "bloglist";

async function main() {
    await mongo.connectDatabase(blogsTable);
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

main();
