const express = require('express');
const router = express.Router();
const placementHeroController = require('../controllers/placementHeroController');
const authMiddleware = require('../middleware/authMiddleware');

// Get placement hero data (public)
router.get('/', placementHeroController.getPlacementHeroData);

// Update placement hero data (protected, admin only)
router.put('/', authMiddleware.auth, placementHeroController.updatePlacementHeroData);

module.exports = router;