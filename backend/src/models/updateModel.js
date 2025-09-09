const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  date: { type: Date, default: Date.now },
  severity: { type: String, enum: ['info', 'important', 'urgent'], default: 'info' },
});

module.exports = mongoose.model('Update', updateSchema);