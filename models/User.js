const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [4, `Username must be at least 4 characters`],
        maxLength: [25, 'Username can be at most 25 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [4, `Email must be at least 4 characters`],
        maxLength: [255, 'Email can be at most 255 characters']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, `Password must be at least 8 characters`],
        maxLength: [1024, 'Password can be at most 25 characters']
    },
    date: {
        type: Date,
        default: Date.now
    },
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History'
    }]
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey');
    return token;
};

// Create model from schema and export
module.exports = User = mongoose.model('User', UserSchema);