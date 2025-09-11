const PlacementStat = require('../models/placementStatModel');

// Get all placement stats
exports.getPlacementStats = async (req, res) => {
  try {
    const stats = await PlacementStat.find();
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new placement stat
exports.createPlacementStat = async (req, res) => {
  const { icon, value, label, description } = req.body;

  try {
    const newStat = new PlacementStat({
      icon,
      value,
      label,
      description,
    });

    const stat = await newStat.save();
    res.json(stat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing placement stat
exports.updatePlacementStat = async (req, res) => {
  const { icon, value, label, description } = req.body;

  try {
    let stat = await PlacementStat.findById(req.params.id);

    if (!stat) {
      return res.status(404).json({ msg: 'Placement stat not found' });
    }

    // Update fields
    stat.icon = icon || stat.icon;
    stat.value = value || stat.value;
    stat.label = label || stat.label;
    stat.description = description || stat.description;

    await stat.save();
    res.json(stat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a placement stat
exports.deletePlacementStat = async (req, res) => {
  try {
    const stat = await PlacementStat.findById(req.params.id);

    if (!stat) {
      return res.status(404).json({ msg: 'Placement stat not found' });
    }

    await PlacementStat.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Placement stat removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};