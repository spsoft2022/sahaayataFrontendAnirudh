import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './Modal.css'; // Include your CSS here
import ConfirmationModal from './Modal';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    setUserId(id);
  }, [location]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.5.56:8089/user-details/${userId}`);
        setUserDetails(response.data); // Assuming your API returns user details as JSON
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
        // Handle error or set appropriate state
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleApprove = async () => {
    try {
      await axios.put(`http://192.168.5.56:8089/approve-user/${userId}`);
      setModalMessage('User approved successfully. Check your email for details.');
      setShowModal(true);
    } catch (error) {
      console.error('Error approving user:', error);
      setModalMessage('User approval failed. Please try again.');
      setShowModal(true);
    }
  };

  
  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  if (!userDetails) {
    return <div>User not found</div>; // Handle case where user details are not found
  }

  return (
    <div className='container py-5'>
      <div className='d-flex justify-content-center'>
        <div style={{ width: '400px' }}>
          <div className='d-flex justify-content-center'>
            <div>
              <h2>User Details</h2>
            
              <p><strong>Username:</strong> {userDetails.username}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Role:</strong> {userDetails.role}</p>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-success' onClick={handleApprove}>
              Approve
            </button>
            <button className='btn btn-danger'>
              Reject
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default UserDetails;