const Update = require('../models/updateModel');

// Get all updates
exports.getUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ date: -1 });
    res.json(updates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new update
exports.createUpdate = async (req, res) => {
  const { titleEn, link, severity, date } = req.body;

  try {
    const newUpdate = new Update({
      titleEn,
      link,
      severity,
      date: date || Date.now(),
    });

    const update = await newUpdate.save();
    res.json(update);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing update
exports.updateUpdate = async (req, res) => {
  const { titleEn, link, severity, date } = req.body;

  try {
    let update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ msg: 'Update not found' });
    }

    // Update fields
    update.titleEn = titleEn || update.titleEn;
    update.link = link || update.link;
    update.severity = severity || update.severity;
    update.date = date || update.date;

    await update.save();
    res.json(update);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an update
exports.deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ msg: 'Update not found' });
    }

    await Update.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Update removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};