import axios from 'axios';

const API_URL = 'http://localhost:5000/api/academic-achievements';

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const academicAchievementService = {
  getAcademicAchievements: () => axios.get(API_URL),
  getAcademicAchievement: (id) => axios.get(`${API_URL}/${id}`),
  createAcademicAchievement: (data) => axios.post(API_URL, data, { headers: authHeader() }),
  updateAcademicAchievement: (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: authHeader() }),
  deleteAcademicAchievement: (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() }),
};

export default academicAchievementService;
