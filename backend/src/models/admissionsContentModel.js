const mongoose = require('mongoose');

const processStepSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const importantDateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
});

const admissionsContentSchema = new mongoose.Schema({
  
  processSteps: [processStepSchema],
  eligibilityCriteria: [{ type: String }],
  importantDates: [importantDateSchema],
  contact: {
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('AdmissionsContent', admissionsContentSchema);
