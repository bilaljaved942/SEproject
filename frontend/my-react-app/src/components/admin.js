import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';

export function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityKey: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add admin login logic here (API calls, etc.)
    console.log('Admin login submitted:', formData);
    // Redirect to admin dashboard after successful login
    // navigate('/admin/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter admin username"
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
              placeholder="Enter admin password"
            />
          </div>
          <div className="form-group">
            <label>Security Key</label>
            <input
              type="password"
              name="securityKey"
              value={formData.securityKey}
              onChange={handleChange}
              required
              placeholder="Enter security key"
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="auth-links">
          <p>Need admin access? <span onClick={() => navigate('/signup-admin')} className="auth-link">Request access</span></p>
        </div>
      </div>
    </div>
  );
}

export function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    masterKey: '',
    role: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Add admin signup logic here (API calls, etc.)
    console.log('Admin signup submitted:', formData);
    // Redirect to login after successful signup
    // navigate('/login-admin');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
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
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Create admin username"
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
              placeholder="Create password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
            <label>Admin Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="system">System Admin</option>
              <option value="finance">Finance Admin</option>
              <option value="operations">Operations Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label>Master Security Key</label>
            <input
              type="password"
              name="masterKey"
              value={formData.masterKey}
              onChange={handleChange}
              required
              placeholder="Enter master security key"
            />
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-links">
          <p>Already have admin access? <span onClick={() => navigate('/login-admin')} className="auth-link">Login</span></p>
        </div>
      </div>
    </div>
  );
}