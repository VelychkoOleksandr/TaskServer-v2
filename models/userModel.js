const mongoose = require('mongoose');
const todoSchema = require('./todoSchema');

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,

    todos: [todoSchema]
});

const User = new mongoose.model('User', userSchema, 'TODOs');

module.exports = User; 