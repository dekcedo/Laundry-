// db.js
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // sesuaikan
  database: "laundry_app",
});

module.exports = db;
