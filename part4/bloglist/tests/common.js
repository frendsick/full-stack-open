const bcrypt = require("bcrypt");
const mongo = require("../utils/mongo");
const { PASSWORD_SALT_ROUNDS } = require("../common/constants");

async function sendUsers(users) {
    const usersCopy = JSON.parse(JSON.stringify(users)); // Create deep copy

    // Hash the password to passwordHash field
    for (let i = 0; i < usersCopy.length; i++) {
        const password = usersCopy[i].password;
        const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
        delete usersCopy[i].password;
        usersCopy[i].passwordHash = passwordHash;
    }
    await mongo.saveListOfUsers(usersCopy);
}

module.exports = { sendUsers };
