const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let users = []

app.get('/', (req, res) => {
    res.json(users)
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.json(users.find(user => user.id === id));
});

app.post('/add_user', (req, res) => {
    const user = req.body.user;
    res.json(users.push(user));
});

app.post('/edit_user', (req, res) => {
    const reqUser = req.body.user;
    users = [...users.map(user => {
        if (user.id == reqUser.id) return reqUser;
        return user
    })];
    res.json(users);
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(user => user.id !== id);
    res.json(users.filter(user => user.id !== id));
})

app.listen(port, () => console.log(`User CRUD app listening on port ${port}!`));
