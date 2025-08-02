import React, { useState } from 'react';
import './signuppage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registerpage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        sendRequest().then(() => {
            alert("Register Success");
            navigate('/loginpage');
        }).catch((err) => {
            alert(err.message);
        });
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/register", {
            name: String(user.name),
            email: String(user.email),
            password: String(user.password),
        }).then((res) => res.data);
    }

  return (
  <div className="signup-background">
    <div className="signup-card">
      <div className="left-section">
        <div className="logo"><img src="/logo.png" alt="logo" /></div>
        <h1>Write, edit, and create together</h1>
        <p>Where ideas flow and collaboration thrives. Join the space where teamwork brings words to life.</p>
        <img src="/regamico.png" alt="illustration" />
        <span className="join-text">Create an account to join our space</span>
      </div>

      <div className="right-section">
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="icon">👤</div>
          <h2>Create Account</h2>

          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            id="name"
            placeholder=" Name"
            required
          />

          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            id="email"
            placeholder=" Username"
            required
          />

          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            id="password"
            placeholder=" Password"
            required
          />

          <label htmlFor="confirm-password">Confirm Password :</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm-password"
            placeholder=" Confirm Password"
            required
          />

          <button type="submit">Sign Up</button>

          <div className="divider"><span>or</span></div>

          <div className="social-buttons">
            <button className="google">G</button>
            <button className="facebook">f</button>
            <button className="linkedin">in</button>
          </div>

          <p className="login-text">
            Already have an account? <Link to='/loginpage'>sign in</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);

    
}

export default Registerpage;
