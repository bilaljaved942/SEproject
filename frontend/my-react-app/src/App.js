import React, { useState, useRef } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Auth Components
import { CustomerLogin, CustomerSignup } from './components/customer';
import { StaffLogin, StaffSignup } from './components/staff';
import { AdminLogin, AdminSignup } from './components/admin';

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // Create refs for each section
  const roomsRef = useRef(null);
  const feedbackRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);

  const handleRoleSelect = (role) => {
    setShowModal(false);
    navigate(`/login-${role}`);
  };

  // Scroll to section function
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <header className="App-header" ref={homeRef}>
        <Navbar 
          onLoginClick={() => setShowModal(true)}
          scrollToRooms={() => scrollToSection(roomsRef)}
          scrollToFeedback={() => scrollToSection(feedbackRef)}
          scrollToContact={() => scrollToSection(contactRef)}
          scrollToHome={() => scrollToSection(homeRef)}
        />
      </header>

      <section className="slider">
        <img src="/2.jpg" alt="Hotel View" className="slider-image" />
        <h1>Welcome to Our Hotel</h1> 
      </section>

      <section className="rooms" ref={roomsRef}>
        <h2>Our Rooms & Suites.</h2>
        <div className="room-gallery">
          <div className="room">
            <h3>Standard Suite</h3>
            <img src="/1.jpg" alt="Room 1" />
          </div>
          <div className="room">
            <h3>Deluxe Suite</h3>
            <img src="/3.jpg" alt="Room 3" />
          </div>
        </div>
      </section>

      <section className="experience">
        <h2>Best Experience Ever..</h2>
        <div className="images">
          <div className="image"><img src="/4.webp" alt="Room" /></div>
          <div className="image"><img src="/5.jpg" alt="Room" /></div>
          <div className="image"><img src="/6.jpg" alt="Room" /></div>
          <div className="image"><img src="/7.jpeg" alt="Room" /></div>
          <div className="image"><img src="/8.jpg" alt="Room" /></div>
          <div className="image"><img src="/9.jpg" alt="Room" /></div>
        </div>
      </section>

      <section className="booking-form" ref={feedbackRef}>
        <h2>Share Your Experience</h2>
        <form>
          <label>
            Name:
            <input type="text" placeholder="Enter your name" />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Stay Date:
            <input type="date" />
          </label>
          <label>
            Rating:
            <select>
              <option value="5">Excellent (5)</option>
              <option value="4">Very Good (4)</option>
              <option value="3">Good (3)</option>
              <option value="2">Fair (2)</option>
              <option value="1">Poor (1)</option>
            </select>
          </label>
          <label>
            Your Feedback:
            <textarea placeholder="Tell us about your experience"></textarea>
          </label>
          <button type="submit">Submit Feedback</button>
        </form>
      </section>

      <footer className="footer" ref={contactRef}>
        <div className="footer-container">
          <div className="footer-logo">
            <h3>Stay Easy</h3>
            <p>Your comfort, our priority. Experience the best stays with Stay Easy!</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Stay Easy Hotel. All rights reserved.</p>
        </div>
      </footer>

      {/* Role Modal */}
      <RoleSelectionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleRoleSelect}
      />
    </div>
  );
}

function Navbar({ onLoginClick, scrollToHome, scrollToFeedback, scrollToRooms, scrollToContact }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Hotel Logo" className="logo-img" />
      </div>
      <ul className="nav-links">
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToHome(); }}>Home</a></li>
        <li><a href="#feedback" onClick={(e) => { e.preventDefault(); scrollToFeedback(); }}>Feedback</a></li>
        <li><a href="#rooms" onClick={(e) => { e.preventDefault(); scrollToRooms(); }}>Rooms</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>Contact</a></li>
        <li><button className="login-btn" onClick={onLoginClick}>Login</button></li>
      </ul>
    </nav>
  );
}

function RoleSelectionModal({ show, onClose, onSelect }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Select Login Type</h2>
        <button onClick={() => onSelect('customer')}>Customer</button>
        <button onClick={() => onSelect('staff')}>Staff</button>
        <button onClick={() => onSelect('admin')}>Admin</button>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />
      
      {/* Customer Routes */}
      <Route path="/login-customer" element={<CustomerLogin />} />
      <Route path="/signup-customer" element={<CustomerSignup />} />
      
      {/* Staff Routes */}
      <Route path="/login-staff" element={<StaffLogin />} />
      <Route path="/signup-staff" element={<StaffSignup />} />
      
      {/* Admin Routes */}
      <Route path="/login-admin" element={<AdminLogin />} />
      <Route path="/signup-admin" element={<AdminSignup />} />
      
      {/* Add Dashboard Routes as needed (protected routes) */}
      {/* <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/staff/dashboard" element={<StaffDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
    </Routes>
  );
}

export default App;