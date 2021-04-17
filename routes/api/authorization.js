const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Get user model
const User = require('../../models/User');

router.get('/', async (req, res) => {
    const logins = await User.find().sort('username');
    res.send(logins);
});

router.post('/', async (req, res) => {
    // Allow users to log in with their their username or their email.
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('User not found');

    let validUser = (req.body.email == user.email || req.body.username == user.username);
    if (!validUser) return res.status(400).send('Invalid credentials');

    // Authenticate user password against hashed password
    // res.send(`${req.body.password}, ${user.password}`);
    bcrypt.compare(req.body.password, user.password)
        .then(result => { 
            if (result) {
                const token = user.generateAuthToken();
                res.send(token);
            } else {
                res.send('Invalid password');
            }
         })
        .catch(err => console.log(err));
});


module.exports = router;