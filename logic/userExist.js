const mongoose = require('mongoose');
const User = require('../models/userModel');
const dbData = require('../metaData/dbData');

const { connectionURL } = dbData;

async function userExists(userName, password, connectionEstablished) {
    let queryResult = null;
    const user = password ? { userName, password } : { userName };
    
    //IF CONNECTION ALREADY ESTABLISHED
    if (connectionEstablished) {
        await User.findOne(user, { _id: 0, __v: 0, todos: 0 }, (err, doc) => {
            if (err) console.error(err);
            if (doc) queryResult = doc;
        });

        return queryResult;
    }
    
    //MANUAL VERSION WITH ESTABLISHING CONNECTION TO DB
    try {
        await mongoose.connect(connectionURL, { useNewUrlParser: true });
        const queries = await User.findOne(user, { _id: 0, __v: 0, todos: 0 }, (err, doc) => { if (doc) userExists = true; });
        queryResult = queries;
        mongoose.connection.close();

    } catch (error) {
       console.error(error);
       mongoose.connection.close();
    }

    return queryResult;
};

module.exports = userExists;