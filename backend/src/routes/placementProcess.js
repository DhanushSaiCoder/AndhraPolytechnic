const express = require('express');
const router = express.Router();
const placementProcessController = require('../controllers/placementProcessController');
const authMiddleware = require('../middleware/authMiddleware');

// All placement process routes should be protected and ideally restricted to admins
router.get('/', placementProcessController.getPlacementProcessSteps);
router.post('/', authMiddleware.auth, placementProcessController.createPlacementProcessStep);
router.put('/:id', authMiddleware.auth, placementProcessController.updatePlacementProcessStep);
router.delete('/:id', authMiddleware.auth, placementProcessController.deletePlacementProcessStep);

module.exports = router;