const HighestPackage = require('../models/highestPackageModel');

// Get all highest packages
exports.getHighestPackages = async (req, res) => {
  try {
    const packages = await HighestPackage.find();
    res.json(packages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new highest package
exports.createHighestPackage = async (req, res) => {
  const { name, department, package: pkg, company, year, image } = req.body;

  try {
    const newPackage = new HighestPackage({
      name,
      department,
      package: pkg,
      company,
      year,
      image,
    });

    const highestPackage = await newPackage.save();
    res.json(highestPackage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing highest package
exports.updateHighestPackage = async (req, res) => {
  const { name, department, package: pkg, company, year, image } = req.body;

  try {
    let highestPackage = await HighestPackage.findById(req.params.id);

    if (!highestPackage) {
      return res.status(404).json({ msg: 'Highest package not found' });
    }

    // Update fields
    highestPackage.name = name || highestPackage.name;
    highestPackage.department = department || highestPackage.department;
    highestPackage.package = pkg || highestPackage.package;
    highestPackage.company = company || highestPackage.company;
    highestPackage.year = year || highestPackage.year;
    highestPackage.image = image || highestPackage.image;

    await highestPackage.save();
    res.json(highestPackage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a highest package
exports.deleteHighestPackage = async (req, res) => {
  try {
    const highestPackage = await HighestPackage.findById(req.params.id);

    if (!highestPackage) {
      return res.status(404).json({ msg: 'Highest package not found' });
    }

    await HighestPackage.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Highest package removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};