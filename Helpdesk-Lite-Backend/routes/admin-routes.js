const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const express = require('express');
const router = express.Router();


router.get('/admin/ticket', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;