const Department = require('../models/departmentModel');

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  const {
    name,
    shortName,
    description,
    image,
    vision,
    mission,
    achievements,
    activities,
    courses,
    faculty,
    labs,
    events,
    totalSeats,
    highestPackageInfo,
    averagePackage,
  } = req.body;

  try {
    const newDepartment = new Department({
      name,
      shortName,
      description,
      image,
      vision,
      mission,
      achievements,
      activities,
      courses,
      faculty,
      labs,
      events,
      totalSeats,
      highestPackageInfo,
      averagePackage,
    });

    const department = await newDepartment.save();
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  const {
    name,
    shortName,
    description,
    image,
    vision,
    mission,
    achievements,
    activities,
    courses,
    faculty,
    labs,
    events,
    totalSeats,
    highestPackageInfo,
    averagePackage,
  } = req.body;

  try {
    let department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }

    // Update fields
    department.name = name || department.name;
    department.shortName = shortName || department.shortName;
    department.description = description || department.description;
    department.image = image || department.image;
    department.vision = vision || department.vision;
    department.mission = mission || department.mission;
    department.achievements = achievements || department.achievements;
    department.activities = activities || department.activities;
    department.courses = courses || department.courses;
    department.faculty = faculty || department.faculty;
    department.labs = labs || department.labs;
    department.events = events || department.events;
    department.totalSeats = totalSeats || department.totalSeats;
    department.highestPackageInfo = highestPackageInfo || department.highestPackageInfo;
    department.averagePackage = averagePackage || department.averagePackage;

    await department.save();
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }

    await Department.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Department removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};