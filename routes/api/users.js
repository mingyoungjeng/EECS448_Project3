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
    await User.findById(req.user._id).select('-password -date -_id')
        .then(result => res.send(result))
        .catch(err => res.json(err));
    // res.send(user);
});

// POST api
router.post('/', async (req, res) => {
    // Construct new item
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    bcrypt.hash(newUser.password, saltRounds)
        .then(hash => {
            console.log(hash)
            newUser.password = hash
            newUser.save()
            .then(() => res.send(newUser.generateAuthToken()))
            .catch(err => {return res.json(err)})
        })
        .catch(err => {return res.json(err)});
});

router.delete('/:id', async (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then( () => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;