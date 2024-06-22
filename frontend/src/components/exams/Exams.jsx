import React, { useEffect, useState } from 'react';
import { getAllExams, deleteExamById } from '../../api/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Exams.css';

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
        <div className="container mt-2">
            <h1 className="mb-2 text-center">Exams</h1>

            <Link to={`/admin/addExam`} className="btn btn-success my-2">
                Create Exam
            </Link>

            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-hover table-bordered exams-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam) => (
                            <tr key={exam.id}>
                                <td>{exam.name}</td>
                                <td>{exam.description}</td>
                                <td className="actions-cell">
                                    <Link
                                        to={`/admin/exams/${exam.id}`}
                                        className="btn btn-primary mx-1"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(exam.id)}
                                        className="btn btn-danger mx-1"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/admin/exams/editExam/${exam.id}`}
                                        state={{ exam }}
                                        className="btn btn-warning mx-1"
                                    >
                                        Update
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
