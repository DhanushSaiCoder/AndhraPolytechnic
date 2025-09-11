const express = require('express');
const router = express.Router();
const { getSyllabus, createCurriculum, updateCurriculum, deleteCurriculum } = require('../controllers/syllabusController');
const { auth, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSyllabus).post(auth, admin, createCurriculum);
router.route('/:currId').put(auth, admin, updateCurriculum).delete(auth, admin, deleteCurriculum);

module.exports = router;
