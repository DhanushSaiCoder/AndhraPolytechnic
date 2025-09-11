const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');
const authMiddleware = require('../middleware/authMiddleware');

// All update routes should be protected and ideally restricted to admins
router.get('/', updateController.getUpdates);
router.post('/', authMiddleware.auth, updateController.createUpdate);
router.put('/:id', authMiddleware.auth, updateController.updateUpdate);
router.delete('/:id', authMiddleware.auth, updateController.deleteUpdate);

module.exports = router;