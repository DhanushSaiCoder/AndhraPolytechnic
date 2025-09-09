const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Stat', StatSchema);