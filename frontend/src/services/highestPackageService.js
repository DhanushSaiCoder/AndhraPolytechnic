import axios from 'axios';

const API_URL = 'http://localhost:5000/api/highest-packages';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getHighestPackages = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createHighestPackage = (packageData) => {
    return axios.post(API_URL, packageData, { headers: authHeader() });
};

const updateHighestPackage = (id, packageData) => {
    return axios.put(`${API_URL}/${id}`, packageData, { headers: authHeader() });
};

const deleteHighestPackage = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const highestPackageService = {
    getHighestPackages,
    createHighestPackage,
    updateHighestPackage,
    deleteHighestPackage,
};

export default highestPackageService;