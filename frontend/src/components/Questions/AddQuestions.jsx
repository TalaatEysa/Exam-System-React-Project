import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {addQuestions} from '../../api/axios'; // Adjust the import path
import '../../css/AddQuestions.css';

const AddQuestions = () => {
  const { examId } = useParams(); // Get the examId from the URL
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false }
  ]);
console.log("exam id is",examId);
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { option_text: '', is_correct: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      exam_id: examId,
      question_text: questionText,
      options: options
    };

    try {
      const response = await addQuestions(questionData);
      console.log('Question added successfully', response);
    } catch (error) {
      console.error('Error adding question', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Question Text:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="form-input"
          placeholder="Enter your question here"
        />
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
        <button type="button" onClick={addOption} className="add-option-button">Add Option</button>
      </div>
      <button type="submit" className="submit-button">Add Question</button>
    </form>
  );
};

export default AddQuestions;
