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
            res.status(500).json({ error: 'Information about the users are not avalible'})
        });
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        res.status(404).json({ message: `No user was found with the id ${userId}`})
    }
    db.findById(userId)
        .then(userId => {
            res.status(200).json(userId);
        })
        .catch(err => {
            res.status(500).json({ error: 'Information about this user is not avalible'})
        });
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.remove(userId)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'No user was found with this id' })
            } else {
                res.status(201).json({ message: 'User was Deleted'})
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'This user could not be deleted' });
        })
})



server.listen(9090, () => {
    console.log('Listening to port 9090');
});
