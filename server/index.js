const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getConnection, closeConnection } = require('./config/database');

// Import routes
const opportunitiesRoutes = require('./routes/opportunities');
const agenciesRoutes = require('./routes/agencies');
const contactsRoutes = require('./routes/contacts');
const entitiesRoutes = require('./routes/entities');
const forecastsRoutes = require('./routes/forecasts');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.API_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'mySalesOps API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/opportunities', opportunitiesRoutes);
app.use('/api/agencies', agenciesRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/entities', entitiesRoutes);
app.use('/api/forecasts', forecastsRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      status: 404
    }
  });
});

// Start server
async function startServer() {
  try {
    // Test database connection
    await getConnection();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   mySalesOps API Server                ║
║   Port: ${PORT}                        ║
║   Status: Running ✅                   ║
║   Database: Connected ✅               ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await closeConnection();
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
