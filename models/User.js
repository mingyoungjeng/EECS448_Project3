const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model from schema and export
module.exports = User = mongoose.model('user', UserSchema);