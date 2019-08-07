const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({error: 'You are required to insert "name" and "bio".'})
    } else {
        db.insert(userInfo)
            .then(user => {
                res.status(201).json({ user })
            })
            .catch(err => { 
                res.status(500).json({ error: 'Could not save this person to the list'})
            })
    }
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Information about this user is not avalible'})
        });
});

server.get('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    if (!userID) {
        res.status(404).json({ error: 'No user was found with this id'})
    }
    db.findById()
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
