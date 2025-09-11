const NewsItem = require('../models/newsItemModel');

// Get all news items
exports.getNewsItems = async (req, res) => {
  try {
    const newsItems = await NewsItem.find().sort({ date: -1 });
    res.json(newsItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new news item
exports.createNewsItem = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const newNewsItem = new NewsItem({
      title,
      description,
      date: date || Date.now(),
    });

    const newsItem = await newNewsItem.save();
    res.json(newsItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing news item
exports.updateNewsItem = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    let newsItem = await NewsItem.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ msg: 'News item not found' });
    }

    // Update fields
    newsItem.title = title || newsItem.title;
    newsItem.description = description || newsItem.description;
    newsItem.date = date || newsItem.date;

    await newsItem.save();
    res.json(newsItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a news item
exports.deleteNewsItem = async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ msg: 'News item not found' });
    }

    await NewsItem.deleteOne({ _id: req.params.id });
    res.json({ msg: 'News item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};