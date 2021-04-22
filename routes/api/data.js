const express = require('express');
const router = express.Router();

// Get user model
const Datum = require('../../models/Datum');

// GET api
router.get('/', async (req, res) => {
    // Model.find()
    await Datum.find()
        .sort({ keyword: 1 })
        .then(result => {return res.json(result)})
        .catch(err => {return res.json(err)});

});


// POST api
router.post('/', async (req, res) => {

    var datum = new Datum({
        keyword: req.body.keyword,
        data: req.body.data
    });

    datum.save()
        .then(result => {return res.status(200).send(result)})
        .catch(error => {return res.status(400).send(error)});
});

module.exports = router;