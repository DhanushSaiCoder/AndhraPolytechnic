const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  semesterCode: { type: String, required: true },
});

const BranchSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  subjects: [SubjectSchema],
});

const SemesterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const CurriculumSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  start_year: { type: Number },
  end_year: { type: Number },
  semesters: [SemesterSchema],
  branches: [BranchSchema],
});

module.exports = mongoose.model('Syllabus', CurriculumSchema);
