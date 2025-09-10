const Syllabus = require('../models/syllabusModel');

// @desc    Get all syllabus data
// @route   GET /api/syllabus
// @access  Public
const getSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.find().populate('branches.department', 'name shortName').sort({ code: 1 });
    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new curriculum
// @route   POST /api/syllabus
// @access  Admin
const createCurriculum = async (req, res) => {
  try {
    const { code, start_year, end_year } = req.body;
    const newCurriculum = new Syllabus({ code, start_year, end_year, branches: [] });
    const savedCurriculum = await newCurriculum.save();
    res.status(201).json(savedCurriculum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a curriculum
// @route   PUT /api/syllabus/:currId
// @access  Admin
const updateCurriculum = async (req, res) => {
  try {
    const { currId } = req.params;
    const updatedCurriculum = await Syllabus.findByIdAndUpdate(currId, req.body, { new: true });
    res.json(updatedCurriculum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a curriculum
// @route   DELETE /api/syllabus/:currId
// @access  Admin
const deleteCurriculum = async (req, res) => {
  try {
    const { currId } = req.params;
    await Syllabus.findByIdAndDelete(currId);
    res.json({ message: 'Curriculum deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSyllabus,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
};