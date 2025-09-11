import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/about-us-achievements';

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const aboutUsAchievementService = {
  getAchievements: () => axios.get(API_URL),
  createAchievement: (data) => axios.post(API_URL, data, { headers: authHeader() }),
  updateAchievement: (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: authHeader() }),
  deleteAchievement: (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() }),
};

export default aboutUsAchievementService;
