const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DatumSchema = new Schema({
    keyword: {
        type: String,
        required: true,
        minLength: 3
    },
    data: {
        type: [Number],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model from schema and export
module.exports = Datum = mongoose.model('Datum', DatumSchema);