const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/gallery
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    const gallery = db.getGallery(category);
    res.json({
      success: true,
      count: gallery.length,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
