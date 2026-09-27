const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/applications
router.get('/', (req, res) => {
  try {
    const apps = db.getApplications();
    res.json({
      success: true,
      data: apps
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
