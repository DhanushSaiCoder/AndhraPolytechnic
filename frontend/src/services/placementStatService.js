import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/placement-stats';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getPlacementStats = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createPlacementStat = (statData) => {
    return axios.post(API_URL, statData, { headers: authHeader() });
};

const updatePlacementStat = (id, statData) => {
    return axios.put(`${API_URL}/${id}`, statData, { headers: authHeader() });
};

const deletePlacementStat = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const placementStatService = {
    getPlacementStats,
    createPlacementStat,
    updatePlacementStat,
    deletePlacementStat,
};

export default placementStatService;