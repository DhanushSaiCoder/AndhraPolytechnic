const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);