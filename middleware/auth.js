const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    console.log("Authorizing user...");
    // Retrieve token from header
    const token = req.header('x-auth-token');
    
    // If no token is found
    if (!token) return res.status(401).send('No token provided');

    try { 
        const payload = jwt.verify(token, 'privateKey');
        req.user = payload;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;