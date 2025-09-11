import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getNewsItems = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createNewsItem = (newsData) => {
    return axios.post(API_URL, newsData, { headers: authHeader() });
};

const updateNewsItem = (id, newsData) => {
    return axios.put(`${API_URL}/${id}`, newsData, { headers: authHeader() });
};

const deleteNewsItem = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const newsService = {
    getNewsItems,
    createNewsItem,
    updateNewsItem,
    deleteNewsItem,
};

export default newsService;