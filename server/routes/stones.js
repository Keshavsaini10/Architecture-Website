const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/stones - list stones with optional filtering by category and search term
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    const stones = db.getStones({ category, search });
    res.json({
      success: true,
      count: stones.length,
      data: stones
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/stones/:id - get specific stone details
router.get('/:id', (req, res) => {
  try {
    const stone = db.getStoneById(req.params.id);
    if (!stone) {
      return res.status(404).json({ success: false, message: 'Stone not found' });
    }
    res.json({
      success: true,
      data: stone
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
