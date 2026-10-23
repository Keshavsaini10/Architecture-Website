const express = require('express');
const router = express.Router();
const db = require('../db');
const requireAdmin = require('../middleware/requireAdmin');

// POST /api/newsletter - subscribe to newsletter
router.post('/', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const result = db.addSubscriber(email, req.body.source || 'website_footer');
    if (result.status === 'already_subscribed') {
      return res.status(200).json({ success: true, message: result.message, status: 'existing' });
    }

    res.status(201).json({
      success: true,
      message: result.message,
      status: 'subscribed'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/newsletter - admin only
router.get('/', requireAdmin, (req, res) => {
  try {
    const list = db.getSubscribers();
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
