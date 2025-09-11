const express = require('express');
const router = express.Router();
const placementContactController = require('../controllers/placementContactController');
const authMiddleware = require('../middleware/authMiddleware');

// Get placement contact data (public)
router.get('/', placementContactController.getPlacementContact);

// Update placement contact data (protected, admin only)
router.put('/', authMiddleware.auth, placementContactController.updatePlacementContact);

module.exports = router;