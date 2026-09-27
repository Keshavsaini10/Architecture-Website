const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/architecture
router.get('/', (req, res) => {
  try {
    const list = db.getArchitecture();
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/architecture/:id
router.get('/:id', (req, res) => {
  try {
    const item = db.getArchitectureById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Architecture landmark not found' });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
