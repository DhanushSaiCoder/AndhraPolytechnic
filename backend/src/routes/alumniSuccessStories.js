const express = require('express');
const router = express.Router();
const { getSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory } = require('../controllers/alumniSuccessStoryController');
const { auth, admin } = require('../middleware/authMiddleware');

// Public route to get all success stories
router.get('/', getSuccessStories);

// Protected routes for admin
router.post('/', [auth, admin], createSuccessStory);
router.put('/:id', [auth, admin], updateSuccessStory);
router.delete('/:id', [auth, admin], deleteSuccessStory);

module.exports = router;