import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you use React Router for navigation
import { getExamByID, updateExam } from '../../api/axios';

export default function EditExam() {
    const { examId } = useParams(); // Get examId from URL params
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        exam_name: '',
        description: '',
        created_by: '',
        duration: ''
    });
    const [validationErrors, setValidationErrors] = useState({}); // State for validation errors

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await getExamByID(examId);
                setFormData({
                    exam_name: response.data.name,
                    description: response.data.description,
                    created_by: localStorage.getItem('id'),
                    duration: response.data.duration
                });
            } catch (error) {
                setError('Failed to fetch exam data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchExam();
    }, [examId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.exam_name.trim()) {
            errors.exam_name = 'Exam name is required.';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required.';
        }
        if (!formData.duration || formData.duration <= 0) {
            errors.duration = 'Duration must be a positive number.';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return;
        }
        try {
            await updateExam(formData, examId);
            console.log('Exam updated successfully');
            navigate(`/exams/${examId}`);
        } catch (error) {
            setError('Failed to update the exam. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h1>Edit Exam</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exam_name">Exam Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exam_name"
                        name="exam_name"
                        value={formData.exam_name}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.exam_name && <span className="text-danger">{validationErrors.exam_name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    {validationErrors.description && <span className="text-danger">{validationErrors.description}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration (minutes)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.duration && <span className="text-danger">{validationErrors.duration}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}
