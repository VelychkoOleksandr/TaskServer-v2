const mongoose = require('mongoose');
const User = require('../models/userModel');
const dbData = require('../metaData/dbData');

const { connectionURL } = dbData;

async function sendTask(email, task) {
    let queryResult = null;

    try {
        await mongoose.connect(connectionURL, { useNewUrlParser: true, useFindAndModify: false });
        
        queryResult = await User.updateOne({ email }, { $push: { todos: task } });
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

module.exports = sendTask;