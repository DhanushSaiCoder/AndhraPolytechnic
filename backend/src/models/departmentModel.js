const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  achievements: {
    type: [String],
    default: [],
  },
  activities: {
    type: [String],
    default: [],
  },
  courses: [
    {
      code: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  faculty: [
    {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      specialization: { type: String, required: true },
      imageUrl: { type: String, required: true },
      socials: [
        {
          type: { type: String, enum: ['linkedin', 'twitter', 'email'], required: true },
          url: { type: String, required: true },
        },
      ],
    },
  ],
  labs: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  events: [
    {
      title: { type: String, required: true },
      date: { type: Date, required: true },
      location: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  totalSeats: {
    type: Number,
    default: 0,
  },
  highestPackageInfo: {
    packageCTC: { type: String, default: 'N/A' },
    companyName: { type: String, default: 'N/A' },
  },
  averagePackage: {
    type: String,
    default: 'N/A',
  },
});

module.exports = mongoose.model('Department', DepartmentSchema);