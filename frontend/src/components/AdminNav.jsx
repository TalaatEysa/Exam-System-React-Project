import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/authSlice';
export function AdminNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <h3>Admin DashBoard</h3>
                <Nav className="ms-auto">
                    {user ? (
                        <>
                            <NavLink className="nav-link" to="/admin/exams">
                                Exams
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/results">
                                Results
                            </NavLink>
                            <Nav.Link className="nav-link" onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                            <NavLink className="nav-link" to="/register">
                                Register
                            </NavLink>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}