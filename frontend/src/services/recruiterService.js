import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/recruiters';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getRecruiters = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createRecruiter = (recruiterData) => {
    return axios.post(API_URL, recruiterData, { headers: authHeader() });
};

const updateRecruiter = (id, recruiterData) => {
    return axios.put(`${API_URL}/${id}`, recruiterData, { headers: authHeader() });
};

const deleteRecruiter = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const recruiterService = {
    getRecruiters,
    createRecruiter,
    updateRecruiter,
    deleteRecruiter,
};

export default recruiterService;