import React, { useEffect, useState } from 'react';
import { getAllExams, deleteExamById } from '../../api/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this exam!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteExamById(examId);
                    setExams(exams.filter(exam => exam.id !== examId));
                    Swal.fire(
                        'Deleted!',
                        'The exam has been deleted.',
                        'success'
                    );
                } catch (error) {
                    setError('Failed to delete the exam. Please try again.');
                }
            }
        });
    };

    return (
        <div className="container mt-4">
            <div className='text-center'>
                <Link to={`/admin/addExam`} className='btn btn-success'>Create Exam</Link>
            </div>    
            <h1 className="mb-4">Exams</h1>
            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {exams.map((exam) => (
                    <div className="col-md-4 mb-4" key={exam.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Name: {exam.name}</h5>
                                <p className="card-text">Description: {exam.description}</p>
                                <Link to={`/admin/exams/${exam.id}`} className='btn btn-primary mx-1'>View</Link>
                                <button onClick={() => handleDelete(exam.id)} className='btn btn-danger mx-1'>Delete</button>
                                <Link to={`/admin/exams/editExam/${exam.id}`} state={{ exam }} className='btn btn-warning mx-1'>Update</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
