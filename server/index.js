require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.url.startsWith('/assets/')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// API Routes
app.use('/api/stones', require('./routes/stones'));
app.use('/api/architecture', require('./routes/architecture'));
app.use('/api/heritage', require('./routes/heritage'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/visualizer', require('./routes/visualizer'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/stats', require('./routes/stats'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'ExploreMore Stones API Server',
    version: '1.0.0'
  });
});

// Serve frontend static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// Fallback for SPA navigation
app.get('*', (req, res) => {
  if (req.url.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏛️  ExploreMore Stones Server running at: http://localhost:${PORT}`);
  console.log(`💎  API endpoints available under http://localhost:${PORT}/api/`);
  console.log(`🖼️  Public assets served from /public`);
  console.log(`====================================================`);
});
