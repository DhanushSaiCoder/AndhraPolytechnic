const express = require('express');
const router = express.Router();
const aboutUsAchievementController = require('../controllers/aboutUsAchievementController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', aboutUsAchievementController.getAchievements);

// Admin routes
router.post('/', authMiddleware.auth, aboutUsAchievementController.createAchievement);
router.put('/:id', authMiddleware.auth, aboutUsAchievementController.updateAchievement);
router.delete('/:id', authMiddleware.auth, aboutUsAchievementController.deleteAchievement);

module.exports = router;
