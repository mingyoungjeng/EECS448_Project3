const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // Arbitrary
        minLength: 4,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 255,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey');
    return token;
};

// Create model from schema and export
module.exports = User = mongoose.model('user', UserSchema);