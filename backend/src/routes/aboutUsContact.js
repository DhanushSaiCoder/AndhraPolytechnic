const express = require('express');
const router = express.Router();
const aboutUsContactController = require('../controllers/aboutUsContactController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', aboutUsContactController.getContact);

// Admin route
router.post('/', authMiddleware.auth, aboutUsContactController.updateContact);

module.exports = router;
