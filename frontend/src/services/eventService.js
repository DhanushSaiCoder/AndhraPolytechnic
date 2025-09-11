import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/events';

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const eventService = {
  getEvents: () => axios.get(API_URL),
  createEvent: (data) => axios.post(API_URL, data, { headers: authHeader() }),
  updateEvent: (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: authHeader() }),
  deleteEvent: (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() }),
};

export default eventService;
