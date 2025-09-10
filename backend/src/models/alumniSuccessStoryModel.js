const mongoose = require('mongoose');

const alumniSuccessStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  field: { type: String, required: true },
  company: { type: String },
  position: { type: String },
  story: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AlumniSuccessStory', alumniSuccessStorySchema);
