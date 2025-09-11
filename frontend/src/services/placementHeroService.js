import axios from 'axios';

const API_URL = 'http://localhost:5000/api/placement-hero';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getPlacementHeroData = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const updatePlacementHeroData = (data) => {
    return axios.put(API_URL, data, { headers: authHeader() });
};

const placementHeroService = {
    getPlacementHeroData,
    updatePlacementHeroData,
};

export default placementHeroService;