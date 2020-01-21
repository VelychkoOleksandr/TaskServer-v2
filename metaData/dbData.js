const collection = "todo";
const username = 'admin';
const password = 'Lfhk7zNdfGBr8vaC';

module.exports = {
    connectionURL: `mongodb+srv://${username}:${password}@cluster0-3mvz8.mongodb.net/${collection}?retryWrites=true&w=majority`
}