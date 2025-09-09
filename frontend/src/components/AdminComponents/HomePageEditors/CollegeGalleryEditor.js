import React, { useState, useEffect } from 'react';

const CollegeGalleryEditor = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({
    id: '',
    image: '',
    title: '',
    subtitle: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    const dummySlides = [
      { id: 'g1', image: 'https://picsum.photos/1200/600?random=1', title: 'Main Academic Block', subtitle: 'Historic architecture' },
      { id: 'g2', image: 'https://picsum.photos/1200/600?random=2', title: 'Innovation Laboratory', subtitle: 'State-of-the-art equipment' },
    ];
    setSlides(dummySlides);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSlide(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSlide = () => {
    if (currentSlide.image.trim() === '' || currentSlide.title.trim() === '') return;
    const id = editingId || `g${slides.length + 1}`;
    const updatedList = editingId
      ? slides.map(slide => (slide.id === editingId ? { ...currentSlide, id } : slide))
      : [...slides, { ...currentSlide, id }];
    setSlides(updatedList);
    setCurrentSlide({ id: '', image: '', title: '', subtitle: '' });
    setEditingId(null);
    alert('Slide saved!');
  };

  const handleEdit = (slide) => {
    setCurrentSlide(slide);
    setEditingId(slide.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setSlides(slides.filter(slide => slide.id !== id));
      alert('Slide deleted!');
    }
  };

  return (
    <section className="admin-section">
      <h3>College Gallery Content</h3>

      <div className="form-group">
        <label htmlFor="slideImage">Image URL</label>
        <input type="text" id="slideImage" name="image" value={currentSlide.image} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="slideTitle">Title</label>
        <input type="text" id="slideTitle" name="title" value={currentSlide.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="slideSubtitle">Subtitle</label>
        <textarea id="slideSubtitle" name="subtitle" value={currentSlide.subtitle} onChange={handleChange}></textarea>
      </div>
      <div className="form-actions">
        <button onClick={handleAddSlide} className="save-btn">{editingId ? 'Save Changes' : 'Add Slide'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentSlide({ id: '', image: '', title: '', subtitle: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Gallery Slides</h4>
      <ul className="admin-list">
        {slides.map(slide => (
          <li key={slide.id} className="admin-list-item">
            <span>{slide.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(slide)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(slide.id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CollegeGalleryEditor;