const { request } = require("express");
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.', success: false });
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);

        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token.', success: false });
    }

}

module.exports = authMiddleware;