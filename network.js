const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');


// Routing
const users = require('./routes/api/users');
const history = require('./routes/api/history');
const auth = require('./routes/api/authorization');
const data = require('./routes/api/data');

// Start express and setup middleware
const app = express();
const cors = require('cors');
app.use(cors());
app.use(cors( { headers: ['x-auth-token']} ));
app.use(bodyParser.json());




// DB Config - get MongoDB uri
// Config/keys was been replaced by the config module, which manages
// A variety of parameters based on enviornment vairable
// const db = require('./config/keys').mongoURI;
const db = config.get('db');
console.log(`db = ${config.get('db')}`);
console.log(`environment = ${config.get('environment')}`);

// Connect to Mongo with uri
mongoose
    .connect(db, { useUnifiedTopology: true , useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log(`MongoDB connection established...`))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', users);
app.use('/api/history', history);
app.use('/api/authorization', auth);
app.use('/api/data', data);

app.use(function(err, req, res, next) {
    res.status(500).json(err);
})

module.exports = app;