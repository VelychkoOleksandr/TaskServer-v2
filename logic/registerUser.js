const mongoose = require('mongoose');
const dbData = require('../metaData/dbData');
const User = require('../models/userModel');
const userExists = require ('./userExist');

const { connectionURL } = dbData;

async function registerUser(userName, password, email) {
    let queryResult = null;

    const user = new User({
        userName,
        password,
        email,
        todos: []
    });

    try {
        await mongoose.connect(connectionURL, { useNewUrlParser: true });
        if (await userExists(userName, password, true)) return {
            error: "User Exists"
        };
        queryResult = await user.save();

    } catch (error) {
        console.error(error);
        return {
            error: "Internal Error"
        };
    }

    // mongoose.connection.close();

    return queryResult;
}

module.exports = registerUser;