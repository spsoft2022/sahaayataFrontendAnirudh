import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    role: 'user', // Default role is 'user'
    approved: false, // Initial approval status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://192.168.5.56:8089/register', {
        username: userDetails.username,
        password: userDetails.password,
        email: userDetails.email,
        role: userDetails.role,
        approved: userDetails.approved, // Include approval status
        confirmPassword: userDetails.confirmPassword,
      });

      if (response.data.success) {
        toast.success('User registered successfully');

        // Send approval email logic here
        // sendApprovalEmail(userDetails.email, userDetails.username, response.data.id);

        setUserDetails({
          username: '',
          password: '',
          email: '',
          confirmPassword: '',
          role: 'user',
          approved: false, // Reset approval status after registration
        });
      } else {
        toast.error(response.data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(error.response.data.error || 'An error occurred. Please try again later.');
    }
  };

  // const sendApprovalEmail = (email, username, userId) => {
  //   // Example email sending logic
  //   const emailData = {
  //     to: email,
  //     subject: 'User Registration Approval',
  //     body: `Hi ${username},\n\nYour registration request has been received. Click this link to approve: http://192.168.5.56:8089/approve/${userId}\n\nRegards,\nYour App Team`,
  //   };

  //   axios.post('http://192.168.5.56:8089/sendEmail', emailData)
  //     .then((response) => {
  //       console.log('Email sent successfully:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error sending email:', error);
  //     });
  // };

  return (
    <div className='my-5'>
      <Container>
        <Row className="justify-content-md-center py-4">
          <Col md={6}>
            <h2>Registration</h2>
            <Form className='mt-5' onSubmit={handleSubmit}>
              <ToastContainer />
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  className='mb-3'
                  name="username"
                  value={userDetails.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  className='mb-3'
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className='mb-3'
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  className='mb-3'
                  name="confirmPassword"
                  value={userDetails.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  as="select"
                  className="mb-3"
                  name="role"
                  value={userDetails.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>

              <div className='d-flex justify-content-center'>
                <Button className='w-50 mt-3' variant="primary" type="submit">
                  Register
                </Button>
              </div>

              <div className='d-flex justify-content-center my-4'>
                <Link to='/user-login'>
                  <p>If you are already registered, please login here.</p>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
