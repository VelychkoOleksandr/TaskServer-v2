const mongoose = require('mongoose');
const User = require('../models/userModel');
const dbData = require('../metaData/dbData');
const userExists = require('./userExist');

const { connectionURL } = dbData;

async function getTodosList(userName, password) {
    let queryResult = "Initial Status";

    //CHECK IF USER IN DB
    if (!(await userExists(userName, password, false))) {
        queryResult = {
            error: "User Not Found"
        };
        return queryResult;
    }
    
    //GETTING USER TODOS
    try {
        await mongoose.connect(connectionURL, { useNewUrlParser: true, useFindAndModify: false });
        let queries = await User.findOne({ userName, password }, {_id: 0, userName: 0, password: 0});
        if (queries) queryResult = queries.todos;
    } catch (error) {
        console.error(error);
        queryResult = {
            error: "Internal Error"
        }; 
    }

    // mongoose.connection.close();
    
    return queryResult;
};

module.exports = getTodosList;