import React from 'react';
import './Signup.css';
import companyLogo from '../../assets/CCPS.png';
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [department, setDepartment] = useState("");
  const [email_2, setEmail_2] = useState("");

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password, confirmPassword, name, position, responsibility, department, email_2);
  };

  return (
    <div className="login-container">
      <img src={companyLogo} alt="Company Logo" className="company-logo" />
      <div className="login-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Full Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Primary Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email_2">Secondary Email:</label>
            <input 
              type="email" 
              id="email_2" 
              name="email_2" 
              required 
              value={email_2}
              onChange={(e) => setEmail_2(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="position">Position:</label>
            <input 
              type="text" 
              id="position" 
              name="position" 
              required 
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="department">Department:</label>
            <input 
              type="text" 
              id="department" 
              name="department" 
              required 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="responsibility">Responsibility:</label>
            <input 
              type="text" 
              id="responsibility" 
              name="responsibility" 
              required 
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;