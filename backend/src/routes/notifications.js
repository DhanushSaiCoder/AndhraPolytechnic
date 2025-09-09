const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// All notification routes should be protected and ideally restricted to admins
router.get('/', notificationController.getNotificationItems);
router.post('/', authMiddleware.auth, notificationController.createNotificationItem);
router.put('/:id', authMiddleware.auth, notificationController.updateNotificationItem);
router.delete('/:id', authMiddleware.auth, notificationController.deleteNotificationItem);

module.exports = router;