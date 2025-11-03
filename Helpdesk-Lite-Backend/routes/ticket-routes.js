const express = require('express');
const {
  getUserTickets,
  getAllTicketsAdmin,
  getTicket,
  createNewTicket,
  updateTicket,
  addTicketComment,
  verifyToken
} = require('../controller/ticket-controller');

const router = express.Router();

// All ticket routes require authentication
router.use(verifyToken);

// User routes
router.get('/', getUserTickets);
router.post('/', createNewTicket);
router.get('/:id', getTicket);
router.post('/:id/comments', addTicketComment);

// Admin routes
router.get('/admin/all', getAllTicketsAdmin);
router.put('/admin/:id', updateTicket);

module.exports = router;