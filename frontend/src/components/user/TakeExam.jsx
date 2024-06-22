import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../api/axios';
import axios from '../../api/axios';
import '../../css/TakeExam.css';
export function TakeExam() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
   const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await getExamById(id);
        setExam(response.data.data);
        setTimeLeft(response.data.data.duration * 60);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);
   useEffect(() => {
     if (!timeLeft) return;

     const intervalId = setInterval(() => {
       setTimeLeft((prevTime) => {
         if (prevTime <= 1) {
           clearInterval(intervalId);
           handleSubmit(); // Automatically submit the exam when time runs out
           return 0;
         }
         return prevTime - 1;
       });
     }, 1000);

     return () => clearInterval(intervalId);
   }, );

   const formatTime = (seconds) => {
     const minutes = Math.floor(seconds / 60);
     const secs = seconds % 60;
     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
   };

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
    if (e) e.preventDefault();
    const score = calculateScore();
    setScore(score);
    // console.log('Selected answers:', answers);
    // console.log('Score:', score);

    // Prepare data to send to backend
    const resultData = {
      exam_id: exam.id,
      user_id: localStorage.getItem('id'), // Adjust based on how you store user info
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
      // alert('Exam submitted successfully!');
      navigate('/userresults');
    } catch (error) {
      console.error('Error submitting exam result:', error);
      // alert('Failed to submit exam. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-center mb-2">
        <div className="text-center btn btn-danger rounded rounded-5 px-3">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>
      <h1 className="mb-4 text-center">{exam.name}</h1>
      <form onSubmit={handleSubmit} className="mx-5">
        {exam.questions.map((question, index) => (
          <div key={question.id} className="mb-4 question-container mx-5">
            <h4>Question {index + 1}:</h4>
            <h5>{question.question_text}</h5>
            {question.options.map((option, optionIndex) => (
              <div
                key={option.id}
                className="form-check d-flex align-items-center"
              >
                <span className="option-index">{optionIndex + 1}.</span>
                <div className="d-flex align-items-center ml-2">
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
                    className="form-check-label ml-2"
                    htmlFor={`option-${option.id}`}
                  >
                    {option.option_text}
                  </label>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="d-flex justify-content-center mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
