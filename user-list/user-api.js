const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./dummy_data')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('', (req, res) => {
    res.json(users)
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    res.json(users.find(user => user.id === id));
    res.status(404).send('User not found');
});

app.listen(port, () => console.log(`User CRUD app listening on port ${port}!`));
