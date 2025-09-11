import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/syllabus';

const getSyllabus = () => {
  return axios.get(API_URL);
};

const createCurriculum = (data, token) => {
  return axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
};

const updateCurriculum = (id, data, token) => {
  return axios.put(`${API_URL}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
};

const deleteCurriculum = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};


export default {
  getSyllabus,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
};