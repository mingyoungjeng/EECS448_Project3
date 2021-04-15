const express = require('express');
const router = express.Router();

// // Necessary for development? Cannot access server from same origin
// const cors = require('cors');
// router.use(cors());

// Get user model
const User = require('../../models/User');

// GET api
router.get('/', (req, res) => {
    // Model.find()
    User.find()
        .sort({ username: 1 })
        .then(users => res.json(users))
        .catch(err => console.log(err));
});

// POST api
router.post('/', (req, res) => {
    // Construct new item
    const newUser = new User({
        username: req.body.username
    });

    // Save the user to the database
    newUser.save()
        .then(() => {
            console.log(`New users ${newUser.username} added to the database...`);
            res.send(newUser);})
        .catch(err => res.send(err));
    
});

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then( () => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;