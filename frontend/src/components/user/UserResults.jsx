import React, { useEffect, useState } from 'react';
import { getUserResults, getAllExams } from '../../api/axios';
import '../../css/UserResults.css';
export function UserResults() {
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [errorResults, setErrorResults] = useState(null);
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [errorExams, setErrorExams] = useState(null);
  const userId = localStorage.getItem('id'); // Adjust based on how you store user info

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user results
        const resultsResponse = await getUserResults(userId);
        setResults(resultsResponse.data.data);
        setLoadingResults(false);

        // Fetch all exams (for displaying exam names)
        const examsResponse = await getAllExams();
        setExams(examsResponse.data.data);
        setLoadingExams(false);
      } catch (error) {
        setErrorResults(error.message);
        setErrorExams(error.message);
      }
    };

    fetchData();
  }, [userId]);

  if (loadingResults || loadingExams) {
    return <div className='text-center'>Loading...</div>;
  }

  if (errorResults || errorExams) {
    return <div>Error: {errorResults || errorExams}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Your Exam Results</h1>
      <div className="row">
        {results.map((result) => (
          <div className="col-md-4 mb-4" key={result.exam_name}>
            <div className="card card-bg-color">
              <div className="card-body">
                <h2 className="card-title text-center">{result.exam_name}</h2>
                <p className="card-text my-5 mx-auto text-center bg-primary text-white rounded-4 w-50 p-1">
                  Score: {result.score}/
                  {
                    exams.find((exam) => exam.name === result.exam_name)
                      .questions.length
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
