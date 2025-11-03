
const connectDB = require('../database/db');

async function getAllUsers() {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM users');
  await db.end();
  return rows;
}

// Create new user
async function createUser({ name, email, username, password, role = 'user' }) {
  const db = await connectDB();
  const query = `INSERT INTO users (name, email, username, password, role) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await db.query(query, [name, email, username, password, role]);
  await db.end();
  return result.insertId;
}

async function findByEmailOrUsername(email, username) {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1', [email, username]);
  await db.end();
  return rows[0];
}

async function findByEmail(email) {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  await db.end();
  return rows[0];
}

module.exports = { getAllUsers, createUser, findByEmailOrUsername, findByEmail };