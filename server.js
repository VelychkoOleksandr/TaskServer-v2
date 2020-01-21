const server = require('express')();
const bodyParser = require('body-parser');

const getTodosList = require('./logic/getTodosList');
const registerUser = require('./logic/registerUser');
const updateTodos = require('./logic/updateTodos');
const sendTask = require('./logic/send-task');

const port = 4088;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen(port);

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


server.get('/', (req, res) => {
    res.send(`You're on the server!`);
    res.end();
});

server.post('/register', async (req, res) => {
    const { userName, password, email } = req.body.userData;
    const queries = await registerUser(userName, password, email);
    res.header('', 'http://localhost:3000/');
    res.send(queries);
    res.end();
});

server.post('/getTodosList', async (req, res) => { 
    const { userName, password } = req.body.userData;
    const queries = await getTodosList(userName, password);
    res.send(queries);
    res.end();
});

server.post('/updateTodos', async (req, res) => {
    const { userName, password, tasks } = req.body.userData;
    const queries = await updateTodos(userName, password, tasks);
    res.send(queries);
    res.end();
});

server.post('/sendTask', async(req, res) => {
    const { task, email } = req.body.taskData;
    const queries = await sendTask(email, task);

    res.send(queries);
    res.end();
}); 




