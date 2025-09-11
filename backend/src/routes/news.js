const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

// All news routes should be protected and ideally restricted to admins
router.get('/', newsController.getNewsItems);
router.post('/', authMiddleware.auth, newsController.createNewsItem);
router.put('/:id', authMiddleware.auth, newsController.updateNewsItem);
router.delete('/:id', authMiddleware.auth, newsController.deleteNewsItem);

module.exports = router;