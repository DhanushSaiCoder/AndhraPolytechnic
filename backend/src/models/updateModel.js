const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['info', 'important', 'urgent'],
    default: 'info',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Update', UpdateSchema);