const express = require('express');
const router = express.Router();
const { query, sql } = require('../config/database');

// GET all opportunities
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT
        id,
        opportunity_name,
        agency_id,
        stage,
        value,
        probability,
        close_date,
        description,
        contact_id,
        created_date,
        last_modified
      FROM opportunities
      ORDER BY created_date DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
});

// GET opportunity by ID
router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM opportunities WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// POST create new opportunity
router.post('/', async (req, res, next) => {
  try {
    const {
      opportunity_name,
      agency_id,
      stage,
      value,
      probability,
      close_date,
      description,
      contact_id
    } = req.body;

    const result = await query(
      `
      INSERT INTO opportunities (
        opportunity_name,
        agency_id,
        stage,
        value,
        probability,
        close_date,
        description,
        contact_id,
        created_date,
        last_modified
      )
      OUTPUT INSERTED.*
      VALUES (
        @opportunity_name,
        @agency_id,
        @stage,
        @value,
        @probability,
        @close_date,
        @description,
        @contact_id,
        GETDATE(),
        GETDATE()
      )
      `,
      {
        opportunity_name,
        agency_id,
        stage,
        value,
        probability,
        close_date,
        description,
        contact_id
      }
    );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update opportunity
router.put('/:id', async (req, res, next) => {
  try {
    const {
      opportunity_name,
      agency_id,
      stage,
      value,
      probability,
      close_date,
      description,
      contact_id
    } = req.body;

    const result = await query(
      `
      UPDATE opportunities
      SET
        opportunity_name = @opportunity_name,
        agency_id = @agency_id,
        stage = @stage,
        value = @value,
        probability = @probability,
        close_date = @close_date,
        description = @description,
        contact_id = @contact_id,
        last_modified = GETDATE()
      OUTPUT INSERTED.*
      WHERE id = @id
      `,
      {
        id: req.params.id,
        opportunity_name,
        agency_id,
        stage,
        value,
        probability,
        close_date,
        description,
        contact_id
      }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE opportunity
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM opportunities WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    res.json({ message: 'Opportunity deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
