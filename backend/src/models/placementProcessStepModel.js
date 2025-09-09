const mongoose = require('mongoose');

const PlacementProcessStepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('PlacementProcessStep', PlacementProcessStepSchema);