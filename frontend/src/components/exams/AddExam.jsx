import React, { useState } from 'react';
import '../../css/AddExam.css'; 
import { useNavigate } from 'react-router-dom';
import { addExam } from '../../api/axios.js';

export default function AddExam() {

  const navigate = useNavigate();
  const [exam, setExam] = useState({
    exam_name: '',
    description: '',
    duration: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!exam.exam_name.trim()) {
      errors.exam_name = 'Exam name is required.';
    }
    if (!exam.description.trim()) {
      errors.description = 'Description is required.';
    }
    if (!exam.duration || exam.duration <= 0) {
      errors.duration = 'Duration must be a positive number.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userId = localStorage.getItem('id'); 

      const examData = { ...exam, created_by: userId };

      console.log('Submitting exam:', examData);
      const response = await addExam(examData);
      console.log('Exam created successfully:', response);

      setExam({ exam_name: '', description: '', duration: '' });
      setErrors({});
      navigate('/admin/exams');
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('An error occurred while adding the exam.');
    }
  };

  return (
    <div className="add-exam-container">
      <h1 className="header">Add Exam</h1>
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
          {errors.exam_name && <span className="error text-danger">{errors.exam_name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={exam.description}
            onChange={handleInputChange}
            placeholder="Enter exam description"
            required
          />
          {errors.description && <span className="error text-danger">{errors.description}</span>}
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
          {errors.duration && <span className="error text-danger">{errors.duration}</span>}
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
