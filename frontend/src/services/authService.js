import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

const getUserRole = () => {
  const user = getCurrentUser();
  if (!user) return null;
  const decoded = jwtDecode(user.token);
  return decoded.user.role;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getUserRole,
};

export default authService;
