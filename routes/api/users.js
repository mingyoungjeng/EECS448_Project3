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
        .then(users => {return res.status(200).json(users)})
        .catch(err => {return res.status(400).json(err)});

});

// GET user information
router.get('/me', auth, async (req, res) => {
    await User.findById(req.user._id).select('-password -date -_id')
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// POST api
router.post('/', async (req, res) => {
    // Construct new item
    console.log(`POST request name with ${JSON.stringify(req.body)}`);
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    // newUser.validate()
    // // .then((result) => {return console.log(result)})
    // .catch((err) => {res.send(err.message); res.end(); return;});
    newUser.validate()
    .then (() => {
    bcrypt.hash(newUser.password, saltRounds)
        .then(hash => {
            console.log(hash)
            newUser.password = hash
            newUser.save()
            .then(() => { console.log(newUser); return res.send(newUser.generateAuthToken())} )
            .catch(err => {return res.status(409).json( {message: "Duplicate user" })})
        })
        .catch(err => {return res.status(409).json(err)});
    })
    .catch(err => {return res.status(409).json(err)});
});

router.delete('/:id', async (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then( () => {return res.status(200).json(user)}))
            // .then( () => {return res.json({ success: true })}))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;