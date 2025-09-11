import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/success-stories';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getSuccessStories = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createSuccessStory = (storyData) => {
    return axios.post(API_URL, storyData, { headers: authHeader() });
};

const updateSuccessStory = (id, storyData) => {
    return axios.put(`${API_URL}/${id}`, storyData, { headers: authHeader() });
};

const deleteSuccessStory = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const successStoryService = {
    getSuccessStories,
    createSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
};

export default successStoryService;