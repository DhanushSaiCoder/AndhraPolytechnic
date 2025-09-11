const Stat = require('../models/statModel');

// Get all stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new stat
exports.createStat = async (req, res) => {
  const { icon, value, label, description } = req.body;

  try {
    const newStat = new Stat({
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

// Update an existing stat
exports.updateStat = async (req, res) => {
  const { icon, value, label, description } = req.body;

  try {
    let stat = await Stat.findById(req.params.id);

    if (!stat) {
      return res.status(404).json({ msg: 'Stat not found' });
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

// Delete a stat
exports.deleteStat = async (req, res) => {
  try {
    const stat = await Stat.findById(req.params.id);

    if (!stat) {
      return res.status(404).json({ msg: 'Stat not found' });
    }

    await Stat.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Stat removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};