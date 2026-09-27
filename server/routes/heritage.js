const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/heritage/timeline
router.get('/timeline', (req, res) => {
  try {
    const timeline = db.getTimeline();
    res.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
