const AboutUsAchievement = require('../models/aboutUsAchievementModel');

// Create a new achievement
exports.createAchievement = async (req, res) => {
  try {
    const achievement = new AboutUsAchievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Error creating achievement', error: error.message });
  }
};

// Get all achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await AboutUsAchievement.find().sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
};

// Update an achievement
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await AboutUsAchievement.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Error updating achievement', error: error.message });
  }
};

// Delete an achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await AboutUsAchievement.findByIdAndDelete(id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting achievement', error: error.message });
  }
};
