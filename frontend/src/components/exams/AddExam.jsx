import React, { useState } from 'react';
import axios from 'axios';
import '../../css/AddExam.css'; // Assuming you have a separate CSS file for styling

export default function AddExam() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [exam, setExam] = useState({
    exam_name: '',
    description: '',
    created_by: '',
    duration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      console.log('Submitting exam:', exam);

      const response = await axios.post(`${baseUrl}/exams/`, exam, { headers });
      console.log('Exam created successfully:', response.data);

      alert('Exam added successfully!');
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('An error occurred while adding the exam.');
    }
  };

  return (
    <div className="add-exam-container">
      <h1>Add Exam</h1>
      <form className="exam-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exam_name">Exam Name</label>
          <input
            type="text"
            id="exam_name"
            name="exam_name"
            value={exam.exam_name}
            onChange={handleInputChange}
            placeholder="Enter exam name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={exam.description}
            onChange={handleInputChange}
            placeholder="Enter exam description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="created_by">Created By (User ID)</label>
          <input
            type="number"
            id="created_by"
            name="created_by"
            value={exam.created_by}
            onChange={handleInputChange}
            placeholder="Enter your user ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={exam.duration}
            onChange={handleInputChange}
            placeholder="Enter exam duration"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
