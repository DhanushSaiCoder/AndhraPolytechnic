const mongoose = require('mongoose');

const GallerySlideSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('GallerySlide', GallerySlideSchema);