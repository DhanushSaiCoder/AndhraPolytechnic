import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/admissions-content';

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

