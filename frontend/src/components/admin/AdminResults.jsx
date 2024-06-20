import React, { useEffect, useState } from 'react';
import { getAllResults } from '../../api/axios'; // Adjust the path based on your project structure
import '../../css/AdminResults.css'; // Import CSS file

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError(error.message || error.response?.data.message || 'Error fetching all results');
        setLoading(false);
      }
    };

    fetchAllResults();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(results) || results.length === 0) return <div>No results found.</div>;

  return (
    <div>
      <h2 className='results-header'>Students' Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Exam Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.user_name}</td>
              <td>{result.exam_name}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResults;
