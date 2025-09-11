const AlumniSuccessStory = require('../models/alumniSuccessStoryModel');

// Create a new success story
exports.createSuccessStory = async (req, res) => {
  try {
    const story = new AlumniSuccessStory(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ message: 'Error creating success story', error: error.message });
  }
};

// Get all success stories
exports.getSuccessStories = async (req, res) => {
  try {
    const stories = await AlumniSuccessStory.find().sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching success stories', error: error.message });
  }
};

// Update a success story
exports.updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await AlumniSuccessStory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(400).json({ message: 'Error updating success story', error: error.message });
  }
};

// Delete a success story
exports.deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await AlumniSuccessStory.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    res.status(200).json({ message: 'Success story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting success story', error: error.message });
  }
};
