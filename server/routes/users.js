const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT id, username, firstName, lastName, email, role, isActive
      FROM users
      ORDER BY lastName, firstName
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, username, firstName, lastName, email, role, isActive
       FROM users WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// POST login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await query(
      `SELECT id, username, firstName, lastName, email, role, isActive, password
       FROM users
       WHERE username = @username AND isActive = 1`,
      { username }
    );

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.recordset[0];

    // In production, use bcrypt to compare hashed passwords
    // For now, doing simple comparison (NOT SECURE - FOR DEVELOPMENT ONLY)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Don't send password back to client
    delete user.password;

    res.json({
      message: 'Login successful',
      user
    });
  } catch (err) {
    next(err);
  }
});

// POST create new user
router.post('/', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email, role } = req.body;

    // In production, hash password with bcrypt before storing
    const result = await query(
      `
      INSERT INTO users (username, password, firstName, lastName, email, role, isActive)
      OUTPUT INSERTED.id, INSERTED.username, INSERTED.firstName, INSERTED.lastName,
             INSERTED.email, INSERTED.role, INSERTED.isActive
      VALUES (@username, @password, @firstName, @lastName, @email, @role, 1)
      `,
      { username, password, firstName, lastName, email, role }
    );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update user
router.put('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, isActive } = req.body;

    const result = await query(
      `
      UPDATE users
      SET firstName = @firstName, lastName = @lastName, email = @email,
          role = @role, isActive = @isActive
      OUTPUT INSERTED.id, INSERTED.username, INSERTED.firstName, INSERTED.lastName,
             INSERTED.email, INSERTED.role, INSERTED.isActive
      WHERE id = @id
      `,
      { id: req.params.id, firstName, lastName, email, role, isActive }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE user (soft delete by setting isActive = 0)
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `UPDATE users SET isActive = 0 WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deactivated successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
