import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admissions-content';

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const admissionsContentService = {
  getAdmissionsContent: () => axios.get(API_URL),
  updateAdmissionsContent: (data) => axios.post(API_URL, data, { headers: authHeader() }),
};

export default admissionsContentService;

