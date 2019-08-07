const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const newPerson= req.body;
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({error: 'You are required to insert "name" and "bio".'})
    } else {
        Users.insert(newPerson)
            .then(user => {
                res.status(201).json({ user })
            })
            .catch(err => { 
                res.status(500).json({ error: 'Could not save this person to the list'})
            })
    }
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Information about this user is not avalible'})
        });
});





server.listen(9090, () => {
    console.log('Listening to port 9090');
});
