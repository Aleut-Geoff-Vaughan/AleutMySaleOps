const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET all forecasts
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT * FROM forecasts ORDER BY fiscalYear DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
});

// GET forecast by ID
router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM forecasts WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Forecast not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// POST create new forecast
router.post('/', async (req, res, next) => {
  try {
    const { fiscalYear, groups, lastUpdated, notes } = req.body;

    const result = await query(
      `
      INSERT INTO forecasts (fiscalYear, groups, lastUpdated, notes)
      OUTPUT INSERTED.*
      VALUES (@fiscalYear, @groups, @lastUpdated, @notes)
      `,
      { fiscalYear, groups, lastUpdated, notes }
    );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update forecast
router.put('/:id', async (req, res, next) => {
  try {
    const { fiscalYear, groups, lastUpdated, notes } = req.body;

    const result = await query(
      `
      UPDATE forecasts
      SET fiscalYear = @fiscalYear, groups = @groups,
          lastUpdated = @lastUpdated, notes = @notes
      OUTPUT INSERTED.*
      WHERE id = @id
      `,
      { id: req.params.id, fiscalYear, groups, lastUpdated, notes }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Forecast not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE forecast
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM forecasts WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Forecast not found' });
    }

    res.json({ message: 'Forecast deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
