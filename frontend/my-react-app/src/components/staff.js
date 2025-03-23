import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { staffLogin, staffSignup } from '../services/authServices';
import './user.css';

export function StaffLogin() {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await staffLogin(formData);
      console.log('Staff login successful:', response.data);
      
      // Save token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'staff');
      
      // Redirect to staff dashboard
      navigate('/staff/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Staff Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              placeholder="Enter your employee ID"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-links">
          <p>New staff? <span onClick={() => navigate('/signup-staff')} className="auth-link">Request account</span></p>
          <p><span className="auth-link">Forgot password?</span></p>
        </div>
      </div>
    </div>
  );
}

export function StaffSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    code: '' // Authorization code for staff signup
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await staffSignup(formData);
      console.log('Staff signup successful:', response.data);
      navigate('/login-staff');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup request failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Staff Account Request</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your work email"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select 
              name="department" 
              value={formData.department} 
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="frontdesk">Front Desk</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="kitchen">Kitchen</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Enter your position"
            />
          </div>
          <div className="form-group">
            <label>Authorization Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Enter authorization code"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
        <div className="auth-links">
          <p>Already have an account? <span onClick={() => navigate('/login-staff')} className="auth-link">Login</span></p>
        </div>
      </div>
    </div>
  );
}