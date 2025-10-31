const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: true, // Required for Azure SQL
    trustServerCertificate: false,
    enableArithAbort: true,
    connectionTimeout: 30000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

async function getConnection() {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect(config);
    console.log('✅ Connected to Azure SQL Database');

    // Handle connection errors
    pool.on('error', err => {
      console.error('❌ Database pool error:', err);
      pool = null;
    });

    return pool;
  } catch (err) {
    console.error('❌ Error connecting to Azure SQL Database:', err);
    throw err;
  }
}

async function closeConnection() {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('✅ Database connection closed');
    }
  } catch (err) {
    console.error('❌ Error closing database connection:', err);
    throw err;
  }
}

// Query helper function
async function query(queryString, params = {}) {
  try {
    const connection = await getConnection();
    const request = connection.request();

    // Add parameters to the request
    Object.keys(params).forEach(key => {
      request.input(key, params[key]);
    });

    const result = await request.query(queryString);
    return result;
  } catch (err) {
    console.error('❌ Query error:', err);
    throw err;
  }
}

module.exports = {
  sql,
  getConnection,
  closeConnection,
  query
};
