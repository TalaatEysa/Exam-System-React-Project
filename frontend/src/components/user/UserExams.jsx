import React, { useEffect, useState } from 'react';
import { getAllExams, getUserResults } from '../../api/axios';
import { Link } from 'react-router-dom';

export function UserExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('id'); // Adjust based on how you store user info

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsResponse, resultsResponse] = await Promise.all([
          getAllExams(),
          getUserResults(userId),
        ]);
        const examsData = examsResponse.data.data;
        const userResultsData = resultsResponse.data.data;

        // Filter exams that the user has already taken
        const availableExams = examsData.filter(
          (exam) =>
            !userResultsData.some((result) => result.exam_name === exam.name),
        );

        setExams(availableExams);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-1">
      <h1 className="mt-4 mb-5">Exams</h1>
      <div className="row">
        {exams.map((exam) => (
          <div className="col-md-4 mb-4" key={exam.id}>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">{exam.name}</h2>
                <p className="card-text">{exam.description}</p>
                <Link to={`/userexams/${exam.id}`} className="btn btn-primary">
                  Take Exam
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
