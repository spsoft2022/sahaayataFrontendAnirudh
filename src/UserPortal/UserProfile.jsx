import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [profile, setProfile] = useState({
   username:'',
    email: '',
    gender: '',
    phone_number: '',
    age: '',
    address: '',
    state: '',
    district: '',
    country: '',
    profilePicture: ''
  });

  const [errors, setErrors] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [editField, setEditField] = useState(null);
  const userId = localStorage.getItem('userId');

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://192.168.5.56:8089/user/${userId}`);
      setProfile(response.data);
      localStorage.setItem("userimage", response.data.profilePicture);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setProfile({ ...profile, [field]: value });
  };

  const validateField = (field, value) => {
    let errorMessage = '';
    if (field === 'email') {
      if (!value.trim()) {
        errorMessage = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Email is invalid';
      }
    } else if (field === 'phone_number') {
      if (!value.trim()) {
        errorMessage = 'Phone Number is required';
      } else if (!/^\d{10}$/.test(value)) {
        errorMessage = 'Phone Number is invalid';
      }
    } else if (field === 'age') {
      if (!value) {
        errorMessage = 'Age is required';
      } else if (value < 18 || value > 100) {
        errorMessage = 'Age must be between 18 and 100';
      }
    } else {
      if (!value.trim()) {
        errorMessage = `${field.replace('_', ' ')} is required`;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage
    }));

    return errorMessage === '';
  };

  const handleUpdateField = async (field) => {
    if (!validateField(field, profile[field])) {
      return;
    }

    try {
      await axios.put(`http://192.168.5.56:8089/user/${userId}`, { field, value: profile[field] });
      toast.success(`${field.replace('_', ' ')} updated successfully`);
      
      // Fetch the updated profile data from the server
      await fetchProfile();

      setEditField(null); // Clear edit field after successful update
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Failed to update ${field}`);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);

      try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await axios.put(`http://192.168.5.56:8089/user/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toast.success('Profile picture updated successfully');
        setProfile(response.data); // Update profile state with the new data including profile picture URL
        localStorage.setItem("userimage", response.data.profilePicture); // Update local storage with new profile picture URL
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast.error('Failed to update profile picture');
      }
    }
  };

  return (
    <div className='container py-5'>
      <ToastContainer />

      <div className=''>
        <div className='mx-auto '>
          <div className='my-auto px-4 d-flex justify-content-center mb-4'>
            <input
              type="file"
              id="profilePictureUpload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label className="image-wrapper">
              <img
                className='img-fluid px-3 py-3 image'
                src={profile.profilePicture || 'default-profile-picture-url'}
                alt=""
                style={{ borderRadius: '50%', background: '#5AADDD', height: '250px', width: '250px', cursor: 'pointer' }}
              />
              <label htmlFor="profilePictureUpload">
                <div className="overlay">
                  <i className="image-icon fas fa-camera"></i>
                </div>
              </label>
            </label>
          </div>

          <div className='d-flex justify-content-center'>
            <div style={{ width: '720px' }}>
              <div className='container'>
                {[
                  { label: 'Username', field: 'username', value: profile.username },
                  { label: 'Email', field: 'email', value: profile.email },
                  { label: 'Gender', field: 'gender', value: profile.gender },
                  { label: 'Phone number', field: 'phone_number', value: profile.phone_number },
                  { label: 'Age', field: 'age', value: profile.age },
                  { label: 'Address', field: 'address', value: profile.address },
                  { label: 'State', field: 'state', value: profile.state },
                  { label: 'District', field: 'district', value: profile.district },
                  { label: 'Country', field: 'country', value: profile.country },
                ].map((row, index) => (
                  <div className='row mb-3' key={index}>
                    <h6 className='col-4'>{row.label}:</h6>
                    <div className='col-8'>
                      {editField === row.field ? (
                        <div className='d-flex justify-content-between gap-3'>
                          <div className='d-flex w-100 gap-3'>
                            <input
                              className='form-control'
                              type={row.field === 'age' || row.field === 'phone_number' ? 'number' : 'text'}
                              value={profile[row.field]}
                              onChange={(e) => handleInputChange(e, row.field)}
                            />
                          </div>
                          <button className='btn btn-danger px-2 mx-3' onClick={() => handleUpdateField(row.field)}>
                            <i className='fa-regular fa-floppy-disk'></i>
                          </button>
                        </div>
                      ) : (
                        <div className='d-flex justify-content-between'>
                          {row.value}
                          <div>
                            <button className='btn btn-danger px-2 mx-3' onClick={() => setEditField(row.field)}>
                              <i className='fa-solid fa-pen-to-square'></i>
                            </button>
                          </div>
                        </div>
                      )}
                      {errors[row.field] && (
                        <div className='text-danger mt-1'>{errors[row.field]}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
