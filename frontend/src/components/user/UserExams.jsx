import React, { useEffect, useState } from 'react';
import { getAllExams } from '../../api/axios';
import { Link } from 'react-router-dom';

export function UserExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllExams();
        setExams(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  return (
    <>
      <div className="container mt-1">
        <h1 className="mt-4 mb-5">Exams</h1>
        {loading && <div>Loading...</div>} {/* Display loading message */}
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
    </>
  );
}

  