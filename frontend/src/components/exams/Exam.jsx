import React, { useEffect, useState } from 'react';
import { getExamByID } from '../../api/axios';
import { Link, useParams } from 'react-router-dom';
import '../../css/Exam.css';

export default function Exam() {
    const { id: examId } = useParams(); // Match this with your route parameter
    console.log("id: ", examId);
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const data = await getExamByID(examId);
                console.log('Exam data received:', data);
                setExamData(data.data);
            } catch (err) {
                console.error('Error fetching exam data:', err);
                setError('Failed to fetch exam data.');
            } finally {
                setLoading(false);
            }
        };

        fetchExam();
    }, [examId]);
console.log("exam data is: " , examData);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!examData) {
        return <div>No exam data available.</div>;
    }

    return (
        <div className="exam-container">
            <Link to={`addQuestions`} className='btn btn-success'>Add Questions</Link>
            <h1>Name: {examData.name}</h1>
            <p><strong>Description:</strong> {examData.description}</p>
            <p><strong>Duration:</strong> {examData.duration} minutes</p>
            <p><strong>Created by:</strong> {examData.created_by}</p>

            <h2>Questions</h2>
            
            {examData.questions && examData.questions.length > 0 ? (
                examData.questions.map((question) => (
                    
                    <div key={question.id} className="question">
                        
                        <h3>{question.question_text}</h3>
                        <ul>
                            {question.options.map((option) => (
                                <li key={option.id} className={option.is_correct ? 'correct-option' : ''}>
                                    {option.option_text} {option.is_correct ? '(Correct)' : ''}
                                </li>
                            ))}
                        </ul>
                        <Link
    to={`editQuestion/${question.id}`}
    state={{ question }}  // Correct way to pass the state
    className='btn btn-warning'
>
    Update
</Link>
                        
                    </div>
                    
                ))
            ) : (
                <p>No questions available for this exam.</p>
            )}
        </div>
    );
}
