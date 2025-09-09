import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notifications';

// Helper function to get auth header
const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const getNotificationItems = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createNotificationItem = (notificationData) => {
    return axios.post(API_URL, notificationData, { headers: authHeader() });
};

const updateNotificationItem = (id, notificationData) => {
    return axios.put(`${API_URL}/${id}`, notificationData, { headers: authHeader() });
};

const deleteNotificationItem = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const notificationService = {
    getNotificationItems,
    createNotificationItem,
    updateNotificationItem,
    deleteNotificationItem,
};

export default notificationService;