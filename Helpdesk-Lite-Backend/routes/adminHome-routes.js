const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();

router.get('/admin/tickets', authMiddleware, (req, res) => {
    const {username, userId, role} = req.user;
    res.json({ 
        message: 'Welcome to the Tickets Route',
        user: {
            username,
            userId,
            role
        }
     });
});

module.exports = router;