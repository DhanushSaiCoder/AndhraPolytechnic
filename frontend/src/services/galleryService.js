import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/gallery';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getGallerySlides = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createGallerySlide = (slideData) => {
    return axios.post(API_URL, slideData, { headers: authHeader() });
};

const updateGallerySlide = (id, slideData) => {
    return axios.put(`${API_URL}/${id}`, slideData, { headers: authHeader() });
};

const deleteGallerySlide = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const galleryService = {
    getGallerySlides,
    createGallerySlide,
    updateGallerySlide,
    deleteGallerySlide,
};

export default galleryService;