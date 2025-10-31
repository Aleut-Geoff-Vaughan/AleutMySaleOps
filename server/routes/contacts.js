const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET all contacts
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT
        id,
        firstName,
        lastName,
        title,
        email,
        phone,
        agency_id
      FROM contacts
      ORDER BY lastName, firstName
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
});

// GET contacts by agency
router.get('/agency/:agencyId', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM contacts WHERE agency_id = @agencyId ORDER BY lastName, firstName`,
      { agencyId: req.params.agencyId }
    );

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
});

// POST create new contact
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, title, email, phone, agency_id } = req.body;

    const result = await query(
      `
      INSERT INTO contacts (firstName, lastName, title, email, phone, agency_id)
      OUTPUT INSERTED.*
      VALUES (@firstName, @lastName, @title, @email, @phone, @agency_id)
      `,
      { firstName, lastName, title, email, phone, agency_id }
    );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update contact
router.put('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, title, email, phone, agency_id } = req.body;

    const result = await query(
      `
      UPDATE contacts
      SET firstName = @firstName, lastName = @lastName, title = @title,
          email = @email, phone = @phone, agency_id = @agency_id
      OUTPUT INSERTED.*
      WHERE id = @id
      `,
      { id: req.params.id, firstName, lastName, title, email, phone, agency_id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE contact
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM contacts WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
