import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/departments';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getDepartments = () => {
    return axios.get(API_URL);
};

const getDepartmentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createDepartment = (departmentData) => {
    return axios.post(API_URL, departmentData, { headers: authHeader() });
};

const updateDepartment = (id, departmentData) => {
    return axios.put(`${API_URL}/${id}`, departmentData, { headers: authHeader() });
};

const deleteDepartment = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const departmentService = {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};

export default departmentService;