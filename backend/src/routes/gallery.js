const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');

// All gallery routes should be protected and ideally restricted to admins
router.get('/', galleryController.getGallerySlides);
router.post('/', authMiddleware.auth, galleryController.createGallerySlide);
router.put('/:id', authMiddleware.auth, galleryController.updateGallerySlide);
router.delete('/:id', authMiddleware.auth, galleryController.deleteGallerySlide);

module.exports = router;