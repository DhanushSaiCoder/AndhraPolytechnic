const express = require('express');
const router = express.Router();
const admissionsController = require('../controllers/admissionsController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', admissionsController.getAdmissionsContent);

// Admin route - using POST to update/create
router.post('/', authMiddleware.auth, admissionsController.updateAdmissionsContent);

module.exports = router;
