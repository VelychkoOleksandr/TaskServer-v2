const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
        label: String,
        important: Boolean,
        done: Boolean,
        createDate: Date,
        author: String
        // todosID: Number,
        // expires: Boolean,
        // expiresDate: Date,
        // updated: Boolean,
        // updateDate: Date
});

module.exports = taskSchema;