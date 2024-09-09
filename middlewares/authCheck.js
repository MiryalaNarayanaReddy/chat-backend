const jwt = require('jsonwebtoken');
const JWT_SECRET = 'chatAPI'; // Consider using an environment variable for security

const isAuthenticated = (req, res, next) => {
    // Extract token from the Authorization header
    const authHeader = req.header('Authorization') || req.header('authorization');
    if (!authHeader) {
        return res.status(401).send({
            error: "Please authenticate using a valid token"
        });
    }

    // Extract token from 'Bearer <token>' format
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).send({
            error: "Token is missing or invalid"
        });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.username;
        // not able to get the username
        next();
    } catch (error) {
        // Handle invalid token
        res.status(401).send({
            error: "Invalid token"
        });
    }
};

module.exports = isAuthenticated;
