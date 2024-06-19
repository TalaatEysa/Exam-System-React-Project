import React, { useState } from 'react';
import axios from './api/axios'; // Assuming this is your custom axios instance
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export function LoginComponent() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/login', {
        user_name: userName,
        password: password,
      });
      console.log(response);
      // Store the token in local storage or context
      localStorage.setItem('auth_token', response.data.access_token);
      localStorage.setItem('user_name', userName);
      localStorage.setItem('user_type', response.data.user_type);
      localStorage.setItem('id',response.data.id)
      

      // Redirect based on user role
      if (response.data.user_type === 'User') {
        navigate('/user');
      } else if (response.data.user_type === 'Admin') {
        navigate('/admin');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
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
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="error">{error}</p>}

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
