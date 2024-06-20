import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Function to retrieve all exams
export const getAllExams = () => {
  const token = localStorage.getItem('auth_token'); // Retrieve the token from local storage

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  return axiosInstance.get('/exams/', { headers });
};

// Function to add an exam
export const addExam = (examData) => {
  const token = localStorage.getItem('auth_token'); // Retrieve the token from local storage

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  return axiosInstance.post('/exams/', examData, { headers });
};

// Function to add questions
export const addQuestions = (questionsData) => {
  const token = localStorage.getItem('auth_token'); // Retrieve the token from local storage

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  };

  return axiosInstance.post('/questions/', questionsData, { headers });
};

export default axiosInstance;
