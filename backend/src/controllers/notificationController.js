const NotificationItem = require('../models/notificationItemModel');

// Get all notification items
exports.getNotificationItems = async (req, res) => {
  try {
    const notificationItems = await NotificationItem.find().sort({ date: -1 });
    res.json(notificationItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new notification item
exports.createNotificationItem = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const newNotificationItem = new NotificationItem({
      title,
      description,
      date: date || Date.now(),
    });

    const notificationItem = await newNotificationItem.save();
    res.json(notificationItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing notification item
exports.updateNotificationItem = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    let notificationItem = await NotificationItem.findById(req.params.id);

    if (!notificationItem) {
      return res.status(404).json({ msg: 'Notification item not found' });
    }

    // Update fields
    notificationItem.title = title || notificationItem.title;
    notificationItem.description = description || notificationItem.description;
    notificationItem.date = date || notificationItem.date;

    await notificationItem.save();
    res.json(notificationItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a notification item
exports.deleteNotificationItem = async (req, res) => {
  try {
    const notificationItem = await NotificationItem.findById(req.params.id);

    if (!notificationItem) {
      return res.status(404).json({ msg: 'Notification item not found' });
    }

    await NotificationItem.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Notification item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};