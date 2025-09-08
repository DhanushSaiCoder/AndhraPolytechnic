const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');

// @route   GET api/admin
// @desc    Get admin dashboard
// @access  Private (Admin)
router.get('/', [auth, admin], (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
