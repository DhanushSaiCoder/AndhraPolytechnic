const AcademicAchievement = require('../models/academicAchievementModel');

// Create a new academic achievement
exports.createAcademicAchievement = async (req, res) => {
  try {
    const achievement = new AcademicAchievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Error creating academic achievement', error: error.message });
  }
};

// Get all academic achievements
exports.getAcademicAchievements = async (req, res) => {
  try {
    const achievements = await AcademicAchievement.find().sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching academic achievements', error: error.message });
  }
};

// Update an academic achievement
exports.updateAcademicAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await AcademicAchievement.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!achievement) {
      return res.status(404).json({ message: 'Academic achievement not found' });
    }
    res.status(200).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Error updating academic achievement', error: error.message });
  }
};

// Delete an academic achievement
exports.deleteAcademicAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await AcademicAchievement.findByIdAndDelete(id);
    if (!achievement) {
      return res.status(404).json({ message: 'Academic achievement not found' });
    }
    res.status(200).json({ message: 'Academic achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting academic achievement', error: error.message });
  }
};
