const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
// Two components: 
//     condition: "bad", "neutral", or "good"
//     date: the current date and time
const HistorySchema = new Schema({
    condition: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model from schema and export
module.exports = History = mongoose.model('History', HistorySchema);