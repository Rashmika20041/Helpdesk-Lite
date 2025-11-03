const connectDB = require('../database/db');

async function getAllTickets() {
  const db = await connectDB();
  const [rows] = await db.query(`
    SELECT t.*, u.name as user_name, u.email as user_email
    FROM tickets t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.created_at DESC
  `);
  await db.end();
  return rows;
}

async function getTicketsByUserId(userId) {
  const db = await connectDB();
  const [rows] = await db.query(`
    SELECT t.*, u.name as user_name, u.email as user_email
    FROM tickets t
    JOIN users u ON t.user_id = u.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC
  `, [userId]);
  await db.end();
  return rows;
}

async function getTicketById(ticketId) {
  const db = await connectDB();
  const [rows] = await db.query(`
    SELECT t.*, u.name as user_name, u.email as user_email
    FROM tickets t
    JOIN users u ON t.user_id = u.id
    WHERE t.id = ?
  `, [ticketId]);
  await db.end();
  return rows[0];
}

async function createTicket({ title, description, priority, userId }) {
  const db = await connectDB();
  const query = `
    INSERT INTO tickets (title, description, priority, user_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [title, description, priority, userId]);
  await db.end();
  return result.insertId;
}

async function updateTicketStatus(ticketId, status, assignedTo = null) {
  const db = await connectDB();
  const query = `
    UPDATE tickets
    SET status = ?, assigned_to = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const [result] = await db.query(query, [status, assignedTo, ticketId]);
  await db.end();
  return result.affectedRows > 0;
}

async function getCommentsByTicketId(ticketId) {
  const db = await connectDB();
  const [rows] = await db.query(`
    SELECT c.*, u.name as author_name, u.email as author_email
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.ticket_id = ?
    ORDER BY c.created_at ASC
  `, [ticketId]);
  await db.end();
  return rows;
}

async function addComment(ticketId, userId, commentText) {
  const db = await connectDB();
  const query = `
    INSERT INTO comments (ticket_id, user_id, comment_text)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [ticketId, userId, commentText]);
  await db.end();
  return result.insertId;
}

module.exports = {
  getAllTickets,
  getTicketsByUserId,
  getTicketById,
  createTicket,
  updateTicketStatus,
  getCommentsByTicketId,
  addComment
};