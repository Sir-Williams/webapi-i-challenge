const express = require('express');

const db = require('./data/db.js');

const server = express();

server.post('/api/users', (req, res) => {
    const newPerson= req.body;
    const { name, bio } =req.body;

    if (!name || !bio) {
        res.status(400).json({error: 'You are required to insert "name" and "bio".'})
    } else {
        db.insert(newPerson)
            .then(addedPerson => {
                res.status(201).json(addedPerson)
            })
            .catch(err => { 
                res.status(500).json({ error: 'Could not save this person to the list'})
            })
    }
})



server.listen(9090, () => {
    console.log('Listening to port 9090');
});
