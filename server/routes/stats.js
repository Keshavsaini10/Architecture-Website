const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/stats
router.get('/', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
