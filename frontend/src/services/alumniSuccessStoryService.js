import axios from 'axios';

const API_URL = 'http://localhost:5000/api/alumni-success-stories';

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const alumniSuccessStoryService = {
    getAlumniSuccessStories: () => axios.get(API_URL),
    createAlumniSuccessStory: (data) => axios.post(API_URL, data, { headers: authHeader() }),
    updateAlumniSuccessStory: (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: authHeader() }),
    deleteAlumniSuccessStory: (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() }),
};

export default alumniSuccessStoryService;
