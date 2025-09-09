const PlacementContact = require('../models/placementContactModel');

// Get placement contact data (singleton)
exports.getPlacementContact = async (req, res) => {
  try {
    const contact = await PlacementContact.findOne();
    if (!contact) {
      return res.status(200).json({ email: '', phone: '', address: '' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update placement contact data (singleton)
exports.updatePlacementContact = async (req, res) => {
  const { email, phone, address } = req.body;

  try {
    let contact = await PlacementContact.findOne();

    if (!contact) {
      contact = new PlacementContact({
        email,
        phone,
        address,
      });
    } else {
      contact.email = email || contact.email;
      contact.phone = phone || contact.phone;
      contact.address = address || contact.address;
    }

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};