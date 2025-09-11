import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/placement-contact';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getPlacementContact = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const updatePlacementContact = (contactData) => {
    return axios.put(API_URL, contactData, { headers: authHeader() });
};

const placementContactService = {
    getPlacementContact,
    updatePlacementContact,
};

export default placementContactService;