const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Note: In a real application, you would protect these routes with authentication and authorization middleware.
// For example, you might want to ensure only admins can access these routes.
// router.use(authMiddleware.protect, authMiddleware.admin);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
