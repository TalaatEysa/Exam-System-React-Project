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

const addQuestions = () => {
    // Retrieve the token from local storage (or any other secure place)
    const token = localStorage.getItem('auth_token'); // Adjust according to how you store the token

    // Create headers object
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // Make the API request with headers
    return axios.get(`${baseUrl}/questions/`, { headers });
};


export { getAllExams, addExam, addQuestions, getExamByID };
