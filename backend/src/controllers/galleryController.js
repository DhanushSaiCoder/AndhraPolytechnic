const GallerySlide = require('../models/gallerySlideModel');

// Get all gallery slides
exports.getGallerySlides = async (req, res) => {
  try {
    const slides = await GallerySlide.find();
    res.json(slides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new gallery slide
exports.createGallerySlide = async (req, res) => {
  const { image, title, subtitle } = req.body;

  try {
    const newSlide = new GallerySlide({
      image,
      title,
      subtitle,
    });

    const slide = await newSlide.save();
    res.json(slide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing gallery slide
exports.updateGallerySlide = async (req, res) => {
  const { image, title, subtitle } = req.body;

  try {
    let slide = await GallerySlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ msg: 'Gallery slide not found' });
    }

    // Update fields
    slide.image = image || slide.image;
    slide.title = title || slide.title;
    slide.subtitle = subtitle || slide.subtitle;

    await slide.save();
    res.json(slide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a gallery slide
exports.deleteGallerySlide = async (req, res) => {
  try {
    const slide = await GallerySlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ msg: 'Gallery slide not found' });
    }

    await GallerySlide.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Gallery slide removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};