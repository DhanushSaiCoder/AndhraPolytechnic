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
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('role', response.data.role);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  let user = {
    token: token,
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role')
  };

  // If email or role are not in localStorage, try decoding the token
  if (!user.email || !user.role) {
    try {
      const decoded = jwtDecode(token);
      // Assuming the decoded token contains user information like email and role
      if (decoded.email) user.email = decoded.email;
      if (decoded.role) user.role = decoded.role;
      // If the token has a 'user' object, use that
      if (decoded.user) {
        if (decoded.user.email) user.email = decoded.user.email;
        if (decoded.user.role) user.role = decoded.user.role;
      }
    } catch (e) {
      console.error("Error decoding JWT token:", e);
      return null;
    }
  }
  return user;
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
