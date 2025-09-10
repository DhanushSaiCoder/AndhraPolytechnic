import axios from 'axios';

const API_URL = 'http://localhost:5000/api/about-us-contact';

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const aboutUsContactService = {
  getContact: () => axios.get(API_URL),
  updateContact: (data) => axios.post(API_URL, data, { headers: authHeader() }),
};

export default aboutUsContactService;
