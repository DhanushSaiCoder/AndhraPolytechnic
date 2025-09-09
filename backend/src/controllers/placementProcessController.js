const PlacementProcessStep = require('../models/placementProcessStepModel');

// Get all placement process steps
exports.getPlacementProcessSteps = async (req, res) => {
  try {
    const steps = await PlacementProcessStep.find();
    res.json(steps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new placement process step
exports.createPlacementProcessStep = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newStep = new PlacementProcessStep({
      title,
      description,
    });

    const step = await newStep.save();
    res.json(step);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing placement process step
exports.updatePlacementProcessStep = async (req, res) => {
  const { title, description } = req.body;

  try {
    let step = await PlacementProcessStep.findById(req.params.id);

    if (!step) {
      return res.status(404).json({ msg: 'Placement process step not found' });
    }

    // Update fields
    step.title = title || step.title;
    step.description = description || step.description;

    await step.save();
    res.json(step);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a placement process step
exports.deletePlacementProcessStep = async (req, res) => {
  try {
    const step = await PlacementProcessStep.findById(req.params.id);

    if (!step) {
      return res.status(404).json({ msg: 'Placement process step not found' });
    }

    await PlacementProcessStep.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Placement process step removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};