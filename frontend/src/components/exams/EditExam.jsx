import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you use React Router for navigation
import { getExamByID, updateExam } from '../../api/axios';

export default function EditExam() {
    const { examId } = useParams(); // Get examId from URL params
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exam, setExam] = useState(null);
    const [formData, setFormData] = useState({
        exam_name: '',
        description: '',
        created_by: '',
        duration: ''
    });

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await getExamByID(examId);
                setExam(response); // Set the fetched exam data
                //console.log(response)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExam( formData ,examId);
            // Optionally, show a success message or navigate to a different page
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
console.log("form data is",formData);
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
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}
