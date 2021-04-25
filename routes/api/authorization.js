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
    var user;

    if (req.body.username) {
        user = await User.findOne({ username: req.body.username }).catch(error => {return res.status(400).json(error)});
    } else if (req.body.email) {
        user = await User.findOne({ email: req.body.email }).catch(error => {return res.status(400).json(error)});
    } else {
        console.log("No username or email entered...");
        return res.status(400).send('User not found');
    }

    if (!user) {
        return res.status(401).send({ message: "No user found by these credentials" });
    }

    console.log(`user = ${user}`);

    let validUser = (req.body.username == user.username || req.body.email == user.email);
    if (!validUser) return res.status(401).send('Invalid credentials');

    // Authenticate user password against hashed password
    // res.send(`${req.body.password}, ${user.password}`);
    bcrypt.compare(req.body.password, user.password)
        .then(result => { 
            if (result) {
                const token = user.generateAuthToken();
                return res.status(200).send(token);
            } else {
                return res.status(401).send('Invalid password');
            }
         })
        .catch(err => {return res.status(400).json(err)});
});


module.exports = router;