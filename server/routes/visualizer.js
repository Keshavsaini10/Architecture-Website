const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/visualizer/presets
router.get('/presets', (req, res) => {
  try {
    const presets = db.getVisualizerPresets();
    res.json({
      success: true,
      data: presets
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
