import axios from 'axios';

const API_URL = 'http://localhost:5000/api/updates';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getUpdates = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createUpdate = (updateData) => {
    return axios.post(API_URL, updateData, { headers: authHeader() });
};

const updateUpdate = (id, updateData) => {
    return axios.put(`${API_URL}/${id}`, updateData, { headers: authHeader() });
};

const deleteUpdate = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const updateService = {
    getUpdates,
    createUpdate,
    updateUpdate,
    deleteUpdate,
};

export default updateService;