import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stats';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getStats = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createStat = (statData) => {
    return axios.post(API_URL, statData, { headers: authHeader() });
};

const updateStat = (id, statData) => {
    return axios.put(`${API_URL}/${id}`, statData, { headers: authHeader() });
};

const deleteStat = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const statService = {
    getStats,
    createStat,
    updateStat,
    deleteStat,
};

export default statService;