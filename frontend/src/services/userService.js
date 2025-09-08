import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getUsers = () => {
    return axios.get(API_URL);
};

const createUser = (userData) => {
    return axios.post(API_URL, userData);
};

const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/${id}`, userData);
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const userService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};

export default userService;
