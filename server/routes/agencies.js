const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET all agencies with their contacts
router.get('/', async (req, res, next) => {
  try {
    const agencies = await query(`
      SELECT
        id,
        name,
        agencyType,
        address,
        city,
        state,
        zip,
        phone,
        website
      FROM agencies
      ORDER BY name
    `);

    // Get contacts for each agency
    const agenciesWithContacts = await Promise.all(
      agencies.recordset.map(async (agency) => {
        const contacts = await query(
          `SELECT id, firstName, lastName, title, email, phone
           FROM contacts
           WHERE agency_id = @agencyId`,
          { agencyId: agency.id }
        );

        return {
          ...agency,
          contacts: contacts.recordset
        };
      })
    );

    res.json(agenciesWithContacts);
  } catch (err) {
    next(err);
  }
});

// GET agency by ID
router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM agencies WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Agency not found' });
    }

    // Get contacts for this agency
    const contacts = await query(
      `SELECT id, firstName, lastName, title, email, phone
       FROM contacts
       WHERE agency_id = @agencyId`,
      { agencyId: req.params.id }
    );

    const agency = {
      ...result.recordset[0],
      contacts: contacts.recordset
    };

    res.json(agency);
  } catch (err) {
    next(err);
  }
});

// POST create new agency
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      agencyType,
      address,
      city,
      state,
      zip,
      phone,
      website
    } = req.body;

    const result = await query(
      `
      INSERT INTO agencies (
        name,
        agencyType,
        address,
        city,
        state,
        zip,
        phone,
        website
      )
      OUTPUT INSERTED.*
      VALUES (
        @name,
        @agencyType,
        @address,
        @city,
        @state,
        @zip,
        @phone,
        @website
      )
      `,
      { name, agencyType, address, city, state, zip, phone, website }
    );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update agency
router.put('/:id', async (req, res, next) => {
  try {
    const {
      name,
      agencyType,
      address,
      city,
      state,
      zip,
      phone,
      website
    } = req.body;

    const result = await query(
      `
      UPDATE agencies
      SET
        name = @name,
        agencyType = @agencyType,
        address = @address,
        city = @city,
        state = @state,
        zip = @zip,
        phone = @phone,
        website = @website
      OUTPUT INSERTED.*
      WHERE id = @id
      `,
      { id: req.params.id, name, agencyType, address, city, state, zip, phone, website }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Agency not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE agency
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM agencies WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Agency not found' });
    }

    res.json({ message: 'Agency deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
