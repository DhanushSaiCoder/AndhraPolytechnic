const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', eventController.getEvents);

// Admin routes
router.post('/', authMiddleware.auth, eventController.createEvent);
router.put('/:id', authMiddleware.auth, eventController.updateEvent);
router.delete('/:id', authMiddleware.auth, eventController.deleteEvent);

module.exports = router;
