const express = require('express');
const router = express.Router();
const placementStatController = require('../controllers/placementStatController');
const authMiddleware = require('../middleware/authMiddleware');

// All placement stat routes should be protected and ideally restricted to admins
router.get('/', placementStatController.getPlacementStats);
router.post('/', authMiddleware.auth, placementStatController.createPlacementStat);
router.put('/:id', authMiddleware.auth, placementStatController.updatePlacementStat);
router.delete('/:id', authMiddleware.auth, placementStatController.deletePlacementStat);

module.exports = router;