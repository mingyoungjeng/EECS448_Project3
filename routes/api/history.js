const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Load middleware
const auth = require('../../middleware/auth');

// Get model
const History = require('../../models/History');
const User = require('../../models/User');

// GET api
router.get('/', auth, (req, res) => {
    const token = req.header('x-auth-token');
    // If no token is found
    if (!token) return res.status(401).send('No token provided');
    
    var userID;
    try {
        const payload = jwt.verify(token, 'privateKey');
        console.log('Got payload...');
        console.log(payload._id);
        userID = payload._id;

        User.findById(userID, 'history')
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
router.post('/', auth, (req, res) => {
    
    const token = req.header('x-auth-token');
    // If no token is found
    if (!token) return res.status(401).send('No token provided');
    
    var userID;
    try {
        const payload = jwt.verify(token, 'privateKey');
        console.log('Got payload...');
        console.log(payload._id);
        userID = payload._id;
        // payload contains _id. Use to link history to user
        
        var user = User.findById(userID);
        
        // Construct new item
        const newSummary = new History({
            condition: req.body.condition
        });

        // Save the user to the database
        newSummary.save()
        .then(() => { console.log(`Adding new daily summary to the database...`) })
        .catch(err => res.send(err));

        

        User.findByIdAndUpdate(
            userID, 
            {$push: {"history": newSummary}},
            { upsert: true },
            function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            })
    } catch (error) {
        console.log(error);
    }

    
    
});

// router.delete('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove()
//             .then( () => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;