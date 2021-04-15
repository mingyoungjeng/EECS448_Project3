const express = require('express');
const router = express.Router();

// Necessary for development? Cannot access server from same origin
const cors = require('cors');
router.use(cors());

// Get model
const History = require('../../models/History');

// GET api
router.get('/', (req, res) => {
    History.find()
        .then(history => res.json(history))
        .catch(err => console.log(err));
});

// POST api
router.post('/', (req, res) => {
    // Construct new item
    const newSummary = new History({
        condition: req.body.condition
    });

    // Save the user to the database
    newSummary.save()
        .then(() => {
            console.log(`Adding new daily summary to the database...`);
            res.send(newSummary);})
        .catch(err => res.send(err));
    
});

// router.delete('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove()
//             .then( () => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;