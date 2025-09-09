const SuccessStory = require('../models/successStoryModel');

// Get all success stories
exports.getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new success story
exports.createSuccessStory = async (req, res) => {
  const { name, company, role, quote, image } = req.body;

  try {
    const newStory = new SuccessStory({
      name,
      company,
      role,
      quote,
      image,
    });

    const story = await newStory.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing success story
exports.updateSuccessStory = async (req, res) => {
  const { name, company, role, quote, image } = req.body;

  try {
    let story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: 'Success story not found' });
    }

    // Update fields
    story.name = name || story.name;
    story.company = company || story.company;
    story.role = role || story.role;
    story.quote = quote || story.quote;
    story.image = image || story.image;

    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a success story
exports.deleteSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: 'Success story not found' });
    }

    await SuccessStory.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Success story removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};