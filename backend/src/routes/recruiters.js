const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const authMiddleware = require('../middleware/authMiddleware');

// All recruiter routes should be protected and ideally restricted to admins
router.get('/', recruiterController.getRecruiters);
router.post('/', authMiddleware.auth, recruiterController.createRecruiter);
router.put('/:id', authMiddleware.auth, recruiterController.updateRecruiter);
router.delete('/:id', authMiddleware.auth, recruiterController.deleteRecruiter);

module.exports = router;