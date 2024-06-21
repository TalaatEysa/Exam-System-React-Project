/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { login } from '../Store/authSlice';
import '../css/Login.css';

export function LoginComponent() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

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
    } else if (login.rejected.match(resultAction)) {
      // Handle specific error cases
      if (resultAction.payload.status === 422) {
        setPasswordError('Invalid username or password.');
      } else {
        // Display generic error message
        setPasswordError('Invalid username or password, please try again.');
      }
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setUserNameError(''); // Clear username error on change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(''); // Clear password error on change
  };

  return (
    <Container className="login-container mt-5">
      <Row className="justify-content-md-center">
        <Col xs={8} md={5} className='login-form'>
          <h1 className='text-center'>Login</h1>
          <Form onSubmit={handleLogin} className='w-75 mx-auto'>
            <Form.Group controlId="userName" className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={handleUserNameChange}
              />
              {userNameError && <p className="text-danger">{userNameError}</p>}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </Form.Group>

            {/* {status === 'failed' && <p className="text-danger">*{error}</p>} */}

            <Button
              className="mt-3 mx-auto d-block"
              variant="primary"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          <p className="d-flex justify-content-center my-3">
            Don't have an account? <Link to="/register"className='ms-2'>Register Now</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
