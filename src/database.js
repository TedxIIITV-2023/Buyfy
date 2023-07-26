const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/buyfy.db');

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      price REAL,
      rating INTEGER
    )
  `);
});

// Implement database queries and functions here
// For example, getAllProducts(), addProductToCart(), etc.
