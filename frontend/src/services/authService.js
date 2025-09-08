import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = (username, password) => {
  return axios.post(API_URL + 'login', {
    username,
    password,
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
