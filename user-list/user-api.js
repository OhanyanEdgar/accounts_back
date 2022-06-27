const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let users = [];

app.get('/', (req, res) => {
    res.json(users);
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) res.json(users[userIndex]);
});

app.post('/add_user', (req, res) => {
    const user = req.body.user;
    if (user) users.push(user);
    res.status(201).send('User created.');
});

app.post('/edit_user', (req, res) => {
    const reqUser = req.body.user;
    const tempUserIndex = users.findIndex(user => user.id === reqUser.id);
    if (tempUserIndex !== -1) users[tempUserIndex] = reqUser;

    res.json(users);
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    res.json(users.filter(user => user.id !== id));
});

app.listen(port, () => console.log(`User CRUD app listening on port ${port}!`));
