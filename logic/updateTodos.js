const mongoose = require('mongoose');
const User = require('../models/userModel');
const dbData = require('../metaData/dbData');
const userExists = require('./userExist');

const { connectionURL } = dbData;

async function updateTodos(userName, password, todo) {
    let queryResult = null;

    try {
        await mongoose.connect(connectionURL, { useNewUrlParser: true, useFindAndModify: false });
        if (!(await userExists(userName, password, true))) return {
            error: "User Not Found. Cant't Update"
        };
        queryResult = await User.updateOne({ userName, password }, { todos: todo });
        if (queryResult.ok != 1) queryResult = {
            error: "Internal Error"
        };
        else queryResult = {
            result: 'Updated'
        };
    } catch (error) {
        console.error(error);
    }

    // mongoose.connection.close();
    return queryResult;
};

module.exports = updateTodos;