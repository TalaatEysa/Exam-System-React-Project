import React, { useEffect, useState } from 'react'
import { getAllExams , deleteExamById } from '../../api/axios';
import { Link } from 'react-router-dom';


export default function Exams() {

     const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



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

    const handleDelete = async (examId) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
            try {
                await deleteExamById(examId);
                setExams(exams.filter(exam => exam.id !== examId));
            } catch (error) {
                setError('Failed to delete the exam. Please try again.');
            }
        }
    };


  return (
    <>
    <div className="container mt-4">
            <Link to={`/addExam`} className='btn btn-success'>Create Exam</Link>      
            <h1 className="mb-4">Exams</h1>
            {loading && <div>Loading...</div>} {/* Display loading message */}
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <div className="row">
                {exams.map((exam) => (
                    <div className="col-md-4 mb-4" key={exam.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Name: {exam.name}</h5>
                                <p className="card-text">Description: {exam.description}</p>
                                <Link to={`/exams/${exam.id}`} className='btn btn-primary mx-1'>View</Link>
                                <button onClick={() => handleDelete(exam.id)} className='btn btn-danger mx-1'>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    
    
  )
}
