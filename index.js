const express = require('express');

const db = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
    console.log('inside get request')
    res.send('<h1>Hi Lambda!</h1k>')
});

server.get('/users', (req, res) => {
    const users = [
        {
            name: 'Sir',
            bio: 'I like Naruto',
            created_at: Date(),
            updated_at: Date(),
        },
        {
            name: 'Marc',
            bio: 'I am very good at playing csgo',
            created_at: Date(),
            updated_at: Date(),
        }
    ];

    res.status(200).json(users);
})

server.post('/users', (req, res) => {
    res.status(201).json({ url: '/users', operation: 'POST' })
})

server.listen(9090, () => {
    console.log('Listening to port 9090');
});
