import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { login } from '../Store/authSlice';

export function LoginComponent() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  const validateInputs = () => {
    let valid = true;

    if (userName.trim() === '') {
      setUserNameError('Username is required.');
      valid = false;
    } else {
      setUserNameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const resultAction = await dispatch(
      login({ user_name: userName, password }),
    );
    if (login.fulfilled.match(resultAction)) {
      const userType = resultAction.payload.user_type;
      if (userType === 'User') {
        navigate('/userexams');
      } else if (userType === 'Admin') {
        navigate('/admin/exams');
      }
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                
              />
              {userNameError && <p className="text-danger">*{userNameError}</p>}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              {passwordError && <p className="text-danger">*{passwordError}</p>}
            </Form.Group>

            {status === 'failed' && <p className="text-danger">*{error}</p>}

            <Button
              variant="primary"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register Now</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
