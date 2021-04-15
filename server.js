const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routing
const users = require('./routes/api/users');
const history = require('./routes/api/history');

// Start express and setup middleware
const app = express();
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());


// DB Config - get MongoDB uri
const db = require('./config/keys').mongoURI;

// Connect to Mongo with uri
mongoose
    .connect(db, { useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', users);
app.use('/api/history', history);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));