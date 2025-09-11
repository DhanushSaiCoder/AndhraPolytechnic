const AboutUsContact = require('../models/aboutUsContactModel');

// Get the single contact document
exports.getContact = async (req, res) => {
  try {
    let contact = await AboutUsContact.findOne();
    if (!contact) {
      // If no content exists, create a default one
      contact = new AboutUsContact({
        address: 'Andhra Polytechnic, Kakinada, Andhra Pradesh - 533002',
        phone: '099123 42010',
        email: 'principal_apt@yahoo.co.in',
        officeHours: [
          'Monday - Friday: 9:00 AM - 5:00 PM',
          'Saturday: 9:00 AM - 1:00 PM',
          'Sunday: Closed',
        ],
      });
      await contact.save();
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact information', error: error.message });
  }
};

// Update (or create) the single contact document
exports.updateContact = async (req, res) => {
  try {
    const contact = await AboutUsContact.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Creates the document if it doesn't exist
      runValidators: true,
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact information', error: error.message });
  }
};
