import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../api/axios';
import axios from '../../api/axios';

export function TakeExam() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();
    
  

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await getExamById(id);
        setExam(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const calculateScore = () => {
    let score = 0;
    exam.questions.forEach((question) => {
      const selectedOption = answers[question.id];
      const correctOption = question.options.find(
        (option) => option.is_correct,
      );
      if (selectedOption === correctOption.id) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const score = calculateScore();
    setScore(score);
    console.log('Selected answers:', answers);
    console.log('Score:', score);

    // Prepare data to send to backend
    const resultData = {
      exam_id: exam.id,
      user_id: localStorage.getItem('user_id'), // Adjust based on how you store user info
      score: score,
    };

    // Send result to backend
    try {
      await axios.post(`/results`, resultData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
        alert('Exam submitted successfully!');
        navigate('/userexams');
        
    } catch (error) {
      console.error('Error submitting exam result:', error);
      alert('Failed to submit exam. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{exam.name}</h1>
      <form onSubmit={handleSubmit}>
        {exam.questions.map((question) => (
          <div key={question.id} className="mb-4">
            <h4>{question.question_text}</h4>
            {question.options.map((option) => (
              <div key={option.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${question.id}`}
                  id={`option-${option.id}`}
                  value={option.id}
                  onChange={() => handleOptionChange(question.id, option.id)}
                  checked={answers[question.id] === option.id}
                />
                <label
                  className="form-check-label"
                  htmlFor={`option-${option.id}`}
                >
                  {option.option_text}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {score !== null && (
        <div className="mt-4">
          <h3>
            Your score: {score} / {exam.questions.length}
          </h3>
        </div>
      )}
    </div>
  );
}
