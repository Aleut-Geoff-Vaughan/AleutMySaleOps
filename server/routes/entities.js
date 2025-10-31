const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET all entities
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT * FROM entities ORDER BY name
    `);

    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
});

// GET entity by ID
router.get('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM entities WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Entity not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// POST create new entity
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      ein,
      state,
      formationDate,
      certifications,
      sbaReportingDue,
      documents,
      notes
    } = req.body;

    const result = await query(
      `
      INSERT INTO entities (
        name, ein, state, formationDate, certifications,
        sbaReportingDue, documents, notes
      )
      OUTPUT INSERTED.*
      VALUES (
        @name, @ein, @state, @formationDate, @certifications,
        @sbaReportingDue, @documents, @notes
      )
      `,
      { name, ein, state, formationDate, certifications, sbaReportingDue, documents, notes }
    );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update entity
router.put('/:id', async (req, res, next) => {
  try {
    const {
      name,
      ein,
      state,
      formationDate,
      certifications,
      sbaReportingDue,
      documents,
      notes
    } = req.body;

    const result = await query(
      `
      UPDATE entities
      SET
        name = @name,
        ein = @ein,
        state = @state,
        formationDate = @formationDate,
        certifications = @certifications,
        sbaReportingDue = @sbaReportingDue,
        documents = @documents,
        notes = @notes
      OUTPUT INSERTED.*
      WHERE id = @id
      `,
      { id: req.params.id, name, ein, state, formationDate, certifications, sbaReportingDue, documents, notes }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Entity not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE entity
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM entities WHERE id = @id`,
      { id: req.params.id }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Entity not found' });
    }

    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
