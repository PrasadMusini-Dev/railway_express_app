const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
});

// Ensure the table exists
const ensureTableExists = async () => {
    try {
      // Check if the table exists
      const [results] = await db.query(`
        SELECT COUNT(*) AS count
        FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = 'railyway'
      `);
  
      if (results[0].count === 0) {
        // Table doesn't exist, create it
        await db.query(`
          CREATE TABLE railyway (
            todo_id INT AUTO_INCREMENT PRIMARY KEY,
            todo VARCHAR(250) NOT NULL
          )
        `);
        console.log('Created railyway table');
      } else {
        console.log('railyway table already exists');
      }
    } catch (err) {
      console.error('Error ensuring table exists:', err);
    }
  };
  

module.exports = { db, ensureTableExists };
