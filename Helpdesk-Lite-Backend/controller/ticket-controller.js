const jwt = require('jsonwebtoken');
const {
  getAllTickets,
  getTicketsByUserId,
  getTicketById,
  createTicket,
  updateTicketStatus,
  getCommentsByTicketId,
  addComment
} = require('../models/ticket');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.', success: false });
  }
};

// Get all tickets for the current user
const getUserTickets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tickets = await getTicketsByUserId(userId);

    // Format tickets to match frontend expectations
    const formattedTickets = tickets.map(ticket => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      createdDate: ticket.created_at.toISOString().split('T')[0],
      userId: ticket.user_id
    }));

    return res.status(200).json({ tickets: formattedTickets, success: true });
  } catch (error) {
    console.error('Error getting user tickets:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// Get all tickets (admin only)
const getAllTicketsAdmin = async (req, res) => {
  try {
    const tickets = await getAllTickets();

    // Format tickets to match frontend expectations
    const formattedTickets = tickets.map(ticket => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      createdDate: ticket.created_at.toISOString().split('T')[0],
      userId: ticket.user_id,
      userName: ticket.user_name,
      userEmail: ticket.user_email,
      assignedTo: ticket.assigned_to
    }));

    return res.status(200).json({ tickets: formattedTickets, success: true });
  } catch (error) {
    console.error('Error getting all tickets:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// Get ticket by ID
const getTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found', success: false });
    }

    // Check if user owns this ticket or is admin
    if (ticket.user_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied', success: false });
    }

    // Get comments for this ticket
    const comments = await getCommentsByTicketId(ticketId);
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      text: comment.comment_text,
      author: comment.author_name,
      createdDate: comment.created_at.toISOString()
    }));

    const formattedTicket = {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      createdDate: ticket.created_at.toISOString().split('T')[0],
      userId: ticket.user_id,
      comments: formattedComments
    };

    return res.status(200).json({ ticket: formattedTicket, success: true });
  } catch (error) {
    console.error('Error getting ticket:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// Create new ticket
const createNewTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.userId;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required', success: false });
    }

    const ticketId = await createTicket({
      title,
      description,
      priority: priority || 'LOW',
      userId
    });

    return res.status(201).json({
      message: 'Ticket created successfully',
      ticketId,
      success: true
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// Update ticket status (admin only)
const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { status, assignedTo } = req.body;

    const success = await updateTicketStatus(ticketId, status, assignedTo);

    if (!success) {
      return res.status(404).json({ message: 'Ticket not found', success: false });
    }

    return res.status(200).json({ message: 'Ticket updated successfully', success: true });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// Add comment to ticket
const addTicketComment = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { comment } = req.body;
    const userId = req.user.userId;

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required', success: false });
    }

    // Verify ticket exists and user has access
    const ticket = await getTicketById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found', success: false });
    }

    // Check if user owns this ticket or is admin
    if (ticket.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied', success: false });
    }

    const commentId = await addComment(ticketId, userId, comment);

    return res.status(201).json({
      message: 'Comment added successfully',
      commentId,
      success: true
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

module.exports = {
  getUserTickets,
  getAllTicketsAdmin,
  getTicket,
  createNewTicket,
  updateTicket,
  addTicketComment,
  verifyToken
};