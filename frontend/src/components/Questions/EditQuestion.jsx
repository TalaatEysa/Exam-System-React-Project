import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { updateQuestion } from '../../api/axios';

export default function EditQuestion() {
    const location = useLocation();
    const { state } = location;
    const question = state ? state.question : null;  // Handle the case where state might be null
    const { id: questionId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        question_text: '',
        options: [{ option_text: '', is_correct: false }]
    });

    useEffect(() => {
        if (question) {
            setFormData({
                question_text: question.question_text,
                options: question.options
            });
        } else {
            // Fetch question data if state is null (e.g., page accessed directly via URL)
            // Use questionId to fetch question data from the backend and set it in formData
            // Example: fetchQuestionById(questionId);
        }
    }, [question, questionId]);

    const handleOptionChange = (index, event) => {
        const newOptions = [...formData.options];
        newOptions[index][event.target.name] = event.target.name === 'is_correct' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            options: newOptions
        });
    };

    const handleQuestionChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateQuestion(formData, questionId);
            navigate(`/exams/${question.exam_id}`); // Navigate back to the exam page
        } catch (error) {
            console.error('Failed to update the question:', error);
        }
    };

    if (!question) {
        return <div>No question data available.</div>;
    }

    return (
        <div className="container mt-4">
            <h1>Edit Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question_text">Question Text</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question_text"
                        name="question_text"
                        value={formData.question_text}
                        onChange={handleQuestionChange}
                        required
                    />
                </div>
                {formData.options.map((option, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={`option_${index}`}>Option {index + 1}</label>
                        <input
                            type="text"
                            className="form-control"
                            id={`option_${index}`}
                            name="option_text"
                            value={option.option_text}
                            onChange={(e) => handleOptionChange(index, e)}
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="is_correct"
                                checked={option.is_correct}
                                onChange={(e) => handleOptionChange(index, e)}
                            /> Correct
                        </label>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}
