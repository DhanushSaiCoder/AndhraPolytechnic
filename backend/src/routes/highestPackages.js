const express = require('express');
const router = express.Router();
const highestPackageController = require('../controllers/highestPackageController');
const authMiddleware = require('../middleware/authMiddleware');

// All highest package routes should be protected and ideally restricted to admins
router.get('/', highestPackageController.getHighestPackages);
router.post('/', authMiddleware.auth, highestPackageController.createHighestPackage);
router.put('/:id', authMiddleware.auth, highestPackageController.updateHighestPackage);
router.delete('/:id', authMiddleware.auth, highestPackageController.deleteHighestPackage);

module.exports = router;