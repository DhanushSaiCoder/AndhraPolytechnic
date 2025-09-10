const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['sports', 'academic', 'co-curricular', 'other'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
