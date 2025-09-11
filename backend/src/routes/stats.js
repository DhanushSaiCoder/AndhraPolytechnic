const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const authMiddleware = require('../middleware/authMiddleware');

// All stat routes should be protected and ideally restricted to admins
router.get('/', statController.getStats);
router.post('/', authMiddleware.auth, statController.createStat);
router.put('/:id', authMiddleware.auth, statController.updateStat);
router.delete('/:id', authMiddleware.auth, statController.deleteStat);

module.exports = router;