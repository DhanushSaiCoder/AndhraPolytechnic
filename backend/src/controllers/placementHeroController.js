const PlacementHero = require('../models/placementHeroModel');

// Get placement hero data (singleton)
exports.getPlacementHeroData = async (req, res) => {
  try {
    const data = await PlacementHero.findOne();
    if (!data) {
      // If no data exists, return a default empty structure or create one
      return res.status(200).json({ years: [], students: [], avgPackage: [] });
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update placement hero data (singleton)
exports.updatePlacementHeroData = async (req, res) => {
  const { years, students, avgPackage } = req.body;

  try {
    let data = await PlacementHero.findOne();

    if (!data) {
      // If no data exists, create a new one
      data = new PlacementHero({
        years,
        students,
        avgPackage,
      });
    } else {
      // Update existing data
      data.years = years || data.years;
      data.students = students || data.students;
      data.avgPackage = avgPackage || data.avgPackage;
    }

    await data.save();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
