const express = require('express');
const router = express.Router();
const successStoryController = require('../controllers/successStoryController');
const authMiddleware = require('../middleware/authMiddleware');

// All success story routes should be protected and ideally restricted to admins
router.get('/', successStoryController.getSuccessStories);
router.post('/', authMiddleware.auth, successStoryController.createSuccessStory);
router.put('/:id', authMiddleware.auth, successStoryController.updateSuccessStory);
router.delete('/:id', authMiddleware.auth, successStoryController.deleteSuccessStory);

module.exports = router;