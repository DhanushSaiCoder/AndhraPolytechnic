const express = require('express');
const router = express.Router();
const academicAchievementController = require('../controllers/academicAchievementController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', academicAchievementController.getAcademicAchievements);

// Admin routes
router.post('/', authMiddleware.auth, academicAchievementController.createAcademicAchievement);
router.put('/:id', authMiddleware.auth, academicAchievementController.updateAcademicAchievement);
router.delete('/:id', authMiddleware.auth, academicAchievementController.deleteAcademicAchievement);

module.exports = router;
