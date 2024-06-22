import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addQuestions } from '../../api/axios'; 
import Swal from 'sweetalert2';
import '../../css/AddQuestions.css';

const AddQuestions = () => {
  const { examId } = useParams(); 
  const navigate = useNavigate()
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false }
  ]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { option_text: '', is_correct: false }]);
  };

  const validateForm = () => {
    const errors = {};
    if (!questionText.trim()) {
      errors.questionText = 'Question text is required.';
    }
    if (options.length < 2) {
      errors.options = 'At least two options are required.';
    }
    options.forEach((option, index) => {
      if (!option.option_text.trim()) {
        errors[`option${index}`] = `Option ${index + 1} text is required.`;
      }
    });
    if (!options.some(option => option.is_correct)) {
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
    const questionData = {
      exam_id: examId,
      question_text: questionText,
      options: options
    };
    try {
      const response = await addQuestions(questionData);
      console.log('Question added successfully', response);
      Swal.fire({
        icon: 'success',
        title: 'Question Added',
        text: 'The question has been added successfully!',
      });
      setQuestionText('');
      setOptions([
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false }
      ]);
      setValidationErrors({});
    } catch (error) {
      console.error('Error adding question', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error adding the question. Please try again.',
      });
    }

    navigate(`/admin/exams/${examId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container mt-4">
     <h2 className='head'>Add Question</h2>
      <div className="form-group">
        <label>Question Text:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="form-input"
          placeholder="Enter your question here"
        />
        {validationErrors.questionText && <span className="text-danger">{validationErrors.questionText}</span>}
      </div>
      <div className="form-group">
        {options.map((option, index) => (
          <div key={index} className="option-group">
            <label>Option {index + 1}:</label>
            <input
              type="text"
              value={option.option_text}
              onChange={(e) => handleOptionChange(index, 'option_text', e.target.value)}
              className="form-input"
              placeholder={`Option ${index + 1}`}
            />
            {validationErrors[`option${index}`] && <span className="text-danger">{validationErrors[`option${index}`]}</span>}
            <label className="correct-label">
              <input
                type="checkbox"
                checked={option.is_correct}
                onChange={(e) => handleOptionChange(index, 'is_correct', e.target.checked)}
                className="form-checkbox"
              />
              Correct
            </label>
          </div>
        ))}
        {validationErrors.options && <span className="text-danger">{validationErrors.options}</span>}
        {validationErrors.correctOption && <span className="text-danger">{validationErrors.correctOption}</span>}
        <button type="button" onClick={addOption} className="add-option-button">Add Option</button>
      </div>
      <button type="submit" className="submit-button">Add Question</button>
    </form>
  );
};

export default AddQuestions;
