import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/placement-process';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getPlacementProcessSteps = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createPlacementProcessStep = (stepData) => {
    return axios.post(API_URL, stepData, { headers: authHeader() });
};

const updatePlacementProcessStep = (id, stepData) => {
    return axios.put(`${API_URL}/${id}`, stepData, { headers: authHeader() });
};

const deletePlacementProcessStep = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const placementProcessService = {
    getPlacementProcessSteps,
    createPlacementProcessStep,
    updatePlacementProcessStep,
    deletePlacementProcessStep,
};

export default placementProcessService;