import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL + '/api/auth/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', {
    email,
    password,
  });
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', {
    email,
    password,
  });
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.user;
  } catch (e) {
    console.error("Error decoding JWT token:", e);
    return null;
  }
};

const getUserRole = () => {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  return user.role;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserRole,
};

export default authService;
