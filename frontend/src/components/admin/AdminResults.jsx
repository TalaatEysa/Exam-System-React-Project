import React, { useEffect, useState } from 'react';
import { getAllExams, getAllResults } from '../../api/axios'; // Adjust the path based on your project structure
import '../../css/AdminResults.css'; // Import CSS file

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [errorExams, setErrorExams] = useState(null);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const response = await getAllResults(); // Fetch all results
        const data = response.data; // Access the data property
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setError('Unexpected data format');
        }
        setLoading(false);

        const examsResponse = await getAllExams();
        setExams(examsResponse.data.data);
        setLoadingExams(false);
      } catch (error) {
        setError(
          error.message ||
            error.response?.data.message ||
            'Error fetching all results',
        );
        setLoading(false);
      }
    };

    fetchAllResults();
  }, []);

  if (loading || loadingExams) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(results) || results.length === 0)
    return <div>No results found.</div>;

  return (
    <div>
      <h2 className="results-header">Students' Results</h2>
      <table className="results-table w-75 mx-auto">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Exam Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            const exam = exams.find((exam) => exam.name === result.exam_name);
            if (!exam) {
              // Handle case where exam is not found
              return (
                <tr key={result.id}>
                  <td>{result.user_name}</td>
                  <td>{result.exam_name}</td>
                  <td>N/A</td> {/* Provide a default value */}
                </tr>
              );
            }
            return (
              <tr key={result.id}>
                <td>{result.user_name}</td>
                <td>{result.exam_name}</td>
                <td>
                  {result.score}/{exam.questions.length}{' '}
                  {/* Assuming questions exist */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResults;
