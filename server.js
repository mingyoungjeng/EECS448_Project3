const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
const db = require('./config/keys').mongoURI;

// Connect to Mongo with uri
mongoose
    .connect(db, { useUnifiedTopology: true , useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', users);
app.use('/api/history', history);
app.use('/api/authorization', auth);
app.use('/api/data', data);

const port = process.env.PORT || 5000;

app.use(function(err, req, res, next) {
    res.status(500).json(err);
})

app.listen(port, () => console.log(`Server started on port ${port}`));