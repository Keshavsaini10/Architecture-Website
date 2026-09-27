const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/inquiries - Submit an inquiry, quote request, or sample box order
router.post('/', (req, res) => {
  try {
    const { name, email, phone, stoneInterest, application, squareFootage, projectType, message } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required fields.' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const inquiry = db.createInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      stoneInterest: stoneInterest || 'General Inquiry',
      application: application || 'Interior/Exterior',
      squareFootage: squareFootage || 'Not Specified',
      projectType: projectType || 'Residential / Commercial',
      message: message ? message.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: `Inquiry successfully submitted! Reference ID: ${inquiry.id}. A stone specialist will contact you within 24 hours.`,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/inquiries - Get all submitted inquiries (for admin review)
router.get('/', (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
