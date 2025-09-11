const mongoose = require('mongoose');

const HighestPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('HighestPackage', HighestPackageSchema);