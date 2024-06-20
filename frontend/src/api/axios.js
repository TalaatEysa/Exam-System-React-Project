import axios from "axios";
export default axios.create({
    baseURL: "http://127.0.0.1:8000/api"



});
const baseUrl = "http://127.0.0.1:8000/api"
const getAllExams = () => {
    // Retrieve the token from local storage (or any other secure place)
    const token = localStorage.getItem('auth_token'); // Adjust according to how you store the token

    // Create headers object
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // Make the API request with headers
    return axios.get(`${baseUrl}/exams/`, { headers });
};


const getExamByID = async (examId) => {
    const token = localStorage.getItem('auth_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(`${baseUrl}/exams/${examId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching the exam:', error.response || error.message);
        throw error;
    }
};
const getExamById = (id) => {
    const token = localStorage.getItem('auth_token'); // Adjust according to how you store the token

    // Create headers object
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.get(`${baseUrl}/exams/${id}`, { headers});
};

const addExam = () => {
    // Retrieve the token from local storage (or any other secure place)
    const token = localStorage.getItem('auth_token'); // Adjust according to how you store the token

    // Create headers object
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // Make the API request with headers
    return axios.get(`${baseUrl}/exams/`, { headers });
};

const addQuestions = async (questionData) => {
  const token = localStorage.getItem('auth_token'); // Adjust according to your token storage

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/questions/', questionData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error adding question', error);
    throw error;
  }
};


const delteExamById = (id) => {
    const token = localStorage.getItem('auth_token'); // Adjust according to how you store the token

    // Create headers object
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.delete(`${baseUrl}/exams/${id}`, { headers});
};


const getUserResults = (userId) => {
    const token = localStorage.getItem('auth_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.get(`${baseUrl}/results/user/${userId}`, { headers });
};

export { getAllExams, addExam, addQuestions, getExamById ,getExamByID,getUserResults };
