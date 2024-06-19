import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink,useNavigate  } from 'react-router-dom';

export function MyNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage (remove tokens and user info)
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_type');

    // Redirect to login page
    navigate('/login');
  };

  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem('auth_token');

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <h3>Exam System</h3>
        <Nav className="ms-auto">
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? 'text-success nav-link' : 'nav-link'
            }
            to="/"
            exact
          >
            Home
          </NavLink> */}
          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-success nav-link' : 'nav-link'
            }
            to="/admin"
          >
            Admin
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-primary nav-link' : 'nav-link'
            }
            to="/user"
          >
            User
          </NavLink>
          {isLoggedIn ? (
            <Nav.Link className="nav-link" onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-success nav-link' : 'nav-link'
              }
              to="/login"
            >
              Login
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
