const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Load middleware
const auth = require('../../middleware/auth');

// Get model
const History = require('../../models/History');
const User = require('../../models/User');

// GET api
// This should really be '/:id'
// a get request should return the whole history collection
router.get('/', auth, (req, res) => {
    try {
        User.findById(req.user, 'history')
            .populate("history")
            .exec((err, history) => {
                res.json(history);
              })
    } catch (err) {
        res.json(err);
    }
});

// POST api
// Add authorization so users cannot update history without token
router.post('/', auth, async (req, res) => {
    // Terminate request if no condition was sent
    if (!req.body.condition) {
        return res.status(500).send("No condition specified");
    }

    const newHistory = new History({
        condition: req.body.condition
    })

    await newHistory.save()
    await User.findByIdAndUpdate(
        req.user, 
        {$push: {"history": newHistory}},
        { upsert: true },
        function(err, result) {
            // console.log(result);
            if (err) {
                console.log(err);
            } 
        })
    .then((result) => {return res.status(200).json(result);})
    .catch(err => {return res.send(err);});
});

// router.delete('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove()
//             .then( () => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;