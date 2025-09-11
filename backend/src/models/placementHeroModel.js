const mongoose = require('mongoose');

const PlacementHeroSchema = new mongoose.Schema({
  years: {
    type: [String],
    required: true,
  },
  students: {
    type: [Number],
    required: true,
  },
  avgPackage: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model('PlacementHero', PlacementHeroSchema);