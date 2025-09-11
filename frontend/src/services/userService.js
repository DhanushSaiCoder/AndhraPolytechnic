import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getUsers = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createUser = (userData) => {
    return axios.post(API_URL, userData, { headers: authHeader() });
};

const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/${id}`, userData, { headers: authHeader() });
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const updatePassword = (id, newPassword) => {
    return axios.put(`${API_URL}/${id}/password`, { password: newPassword }, { headers: authHeader() });
};

const userService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    updatePassword // Add the new function
};

export default userService;
