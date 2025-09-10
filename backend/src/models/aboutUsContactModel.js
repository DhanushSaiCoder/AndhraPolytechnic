const mongoose = require('mongoose');

const aboutUsContactSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  officeHours: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model('AboutUsContact', aboutUsContactSchema);
