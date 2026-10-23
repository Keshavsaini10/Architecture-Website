module.exports = function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(403).json({
      success: false,
      message: 'Lead listings are disabled. Set ADMIN_API_KEY on the server.'
    });
  }

  const header = req.get('authorization') || '';
  const bearer = header.replace(/^Bearer\s+/i, '').trim();
  const provided = req.get('x-admin-key') || bearer;

  if (!provided || provided !== expected) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
};
