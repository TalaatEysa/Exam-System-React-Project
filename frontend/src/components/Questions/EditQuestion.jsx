import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { updateQuestion } from '../../api/axios';
import '../../css/EditQuestion.css';


export default function EditQuestion() {
    const location = useLocation();
    const { state } = location;
    const question = state ? state.question : null;  
    const { id: questionId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        question_text: '',
        options: [{ option_text: '', is_correct: false }]
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (question) {
            setFormData({
                question_text: question.question_text,
                options: question.options
            });
        } else {
            
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

    const validateForm = () => {
        const errors = {};
        if (!formData.question_text.trim()) {
            errors.question_text = 'Question text is required.';
        }
        formData.options.forEach((option, index) => {
            if (!option.option_text.trim()) {
                errors[`option_${index}`] = `Option ${index + 1} text is required.`;
            }
        });
        if (!formData.options.some(option => option.is_correct)) {
            errors.correctOption = 'At least one option must be marked as correct.';
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
            await updateQuestion(formData, questionId);
            navigate(`/admin/exams/${question.exam_id}`);
        } catch (error) {
            console.error('Failed to update the question:', error);
        }
    };

    if (!question) {
        return <div>No question data available.</div>;
    }

    return (
        <div className='all'>
        <div className="container mt-4">
            <h2 className='head'>Edit Question</h2>
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
                    {validationErrors.question_text && <span className="text-danger">{validationErrors.question_text}</span>}
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
                        {validationErrors[`option_${index}`] && <span className="text-danger">{validationErrors[`option_${index}`]}</span>}
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
                {validationErrors.correctOption && <span className="text-danger">{validationErrors.correctOption}</span>}
                <button type="submit" className="custom-save-btn">Save Changes</button>
            </form>
        </div>
        </div>
    );
}
