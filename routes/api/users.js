const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// // Necessary for development? Cannot access server from same origin
// const cors = require('cors');
// router.use(cors());

// Get user model
const User = require('../../models/User');

// GET api
router.get('/', async (req, res) => {
    // Model.find()
    await User.find()
        .sort({ username: 1 })
        .then(users => res.json(users))
        .catch(err => console.log(err));

});

// GET user information
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -date -_id');
    res.send(user);
});

// POST api
router.post('/', async (req, res) => {
    // Construct new item
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    await bcrypt.hash(newUser.password, saltRounds)
        .then((hash) => {newUser.password = hash})
        .then(() => newUser.save() )
        .then(() => {
            console.log(`New users ${newUser.username} added to the database...`)})
            // res.send(newUser);})
        .catch(err => console.log(err));

    // Save the user to the database
    // Is this the right place to encrypt the password?
    // newUser.save()

    console.log("Creating token");
    const token = newUser.generateAuthToken();
    // Send token back, because can't figure out how to do anything else
    res.send(token);
    // res.header('x-auth-token', token).send(newUser);
    
});

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then( () => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;