const mongoose = require('mongoose');

const academicAchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['student', 'faculty'] },
  images: [{ type: String }], // Array of image URLs
}, { timestamps: true });

module.exports = mongoose.model('AcademicAchievement', academicAchievementSchema);
