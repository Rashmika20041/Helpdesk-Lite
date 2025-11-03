const mysql = require('mysql2/promise');

const connectDB = async () => {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'helpdesk_lite',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306
  };

  try {
    const conn = await mysql.createConnection(config);
    await conn.ping();

    const createUsersTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await conn.query(createUsersTableSQL);

    console.log(`Database '${config.database}' connected successfully`);

    return conn;
  } catch (error) {
    if (error && (error.code === 'ER_BAD_DB_ERROR' || error.errno === 1049)) {
      console.warn(`Database '${config.database}' not found. Creating...`);

      const adminConn = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port
      });
      await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci`);
      await adminConn.end();
      console.log(`Database '${config.database}' created successfully`);

      return connectDB();
    }

    console.error('Database connection failed:', error && error.message ? error.message : error);
    process.exit(1);
  }
};

module.exports = connectDB;
