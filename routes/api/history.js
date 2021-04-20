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
    try {
        // const payload = jwt.verify(token, 'privateKey');
        // console.log('Got payload...');
        // console.log(payload._id);
        // userID = payload._id;

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
    try {
        console.log("HISTORY post");
        var user = await User.findById(req.user);
        
        // Construct new item
        const newSummary = new History({
            condition: req.body.params.condition
        });
        console.log(newSummary);

        // Save the history to the database
        newSummary.save()
            .then(() => { console.log(`Adding new daily summary to the database...`) })
            .catch(err => res.send(err));

        User.findByIdAndUpdate(
            req.user, 
            {$push: {"history": newSummary}},
            { upsert: true },
            function(err, result) {
                if (err) {
                    console.log(err);
                } 
            })
            .catch(err => console.log(err));
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