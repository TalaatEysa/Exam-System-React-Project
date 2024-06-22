import React, { useState } from "react";
import axios from '../../api/axios';
import "../../css/StudentRegistration.css";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    
    // Check for client-side errors
    const newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }
    if (!/^[A-Za-z]+[A-Za-z0-9]*$/.test(formData.user_name)) {
      newErrors.user_name = "Username must contain letters or a combination of letters and numbers.";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Password and Confirm Password do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('/register', formData);
      console.log('Registration successful!', response.data);
      setRegistrationSuccess(true); 
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors || {};
        setErrors(serverErrors);
      } else {
        console.error('Registration failed!', error);
      }
    }
  };

  return (
    <div className="student-registration">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
          {errors.user_name && <span className="error-message">{errors.user_name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
          {errors.password_confirmation && <span className="error-message">{errors.password_confirmation}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
      {registrationSuccess && (
        <div className="success-message">
          You are registered successfully!
        </div>
      )}
    </div>
  );
};

export default StudentRegistration;
