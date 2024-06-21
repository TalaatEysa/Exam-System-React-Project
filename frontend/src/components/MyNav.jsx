import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/authSlice';
import '../css/MyNav.css';

export function MyNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isAdmin = user && user.user_type === 'Admin';

  return (
    <Navbar className="navbar-bg" data-bs-theme="light">
      <Container>
        <h3>{isAdmin ? 'Admin Dashboard' : 'Exam System'}</h3>{' '}
        <Nav className="ms-auto">
          {user ? (
            <>
              {isAdmin ? (
                <>
                  <NavLink className="nav-link" to="/admin/exams">
                    Exams
                  </NavLink>
                  <NavLink className="nav-link" to="/admin/results">
                    Results
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/userexams">
                    Exams
                  </NavLink>
                  <NavLink className="nav-link text-dark" to="/userresults">
                    Results
                  </NavLink>
                </>
              )}

              <NavLink
                className="btn btn-danger rounded rounded-pill ms-3"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
              <Nav.Item className='pt-2 mx-5'>
                <h6 className="text-dark">{user.name}</h6>
              </Nav.Item>
            </>
          ) : (
            <>
              <NavLink
                className="btn btn-primary rounded rounded-pill"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="mx-2 btn btn-success rounded rounded-pill"
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
