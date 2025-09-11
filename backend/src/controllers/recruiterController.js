const Recruiter = require('../models/recruiterModel');

// Get all recruiters
exports.getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new recruiter
exports.createRecruiter = async (req, res) => {
  const { name, logo } = req.body;

  try {
    const newRecruiter = new Recruiter({
      name,
      logo,
    });

    const recruiter = await newRecruiter.save();
    res.json(recruiter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing recruiter
exports.updateRecruiter = async (req, res) => {
  const { name, logo } = req.body;

  try {
    let recruiter = await Recruiter.findById(req.params.id);

    if (!recruiter) {
      return res.status(404).json({ msg: 'Recruiter not found' });
    }

    // Update fields
    recruiter.name = name || recruiter.name;
    recruiter.logo = logo || recruiter.logo;

    await recruiter.save();
    res.json(recruiter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a recruiter
exports.deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);

    if (!recruiter) {
      return res.status(404).json({ msg: 'Recruiter not found' });
    }

    await Recruiter.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Recruiter removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};