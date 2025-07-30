import React, { useContext, useState } from 'react';
import '../../css/Authentication.css';
import AmazonLogo from '../../assets/black_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URI } from '../utils/utils.js';
import { toast, ToastContainer } from 'react-toastify';
import { LoginContext } from '../Context/LoginContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { setAccount } = useContext(LoginContext);

  const [logdata, setLogdata] = useState({
    email: "",
    password: ""
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setLogdata({ ...logdata, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    try {
      const res = await fetch(`${BACKEND_URI}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        toast.warning('Invalid Credentials', { position: 'top-right' });
      } else {
        setAccount(data);
        navigate('/');
        setLogdata({ email: "", password: "" });
      }
    } catch (err) {
      toast.error("Server Error", err.message);
    }
  };

  return (
    <div className="auth-container">
      <img src={AmazonLogo} alt="Amazon Logo" className="auth-logo" />
      <h1>Sign-In</h1>

      <form method="POST">
        <label htmlFor="email">Email or mobile phone number</label>
        <input
          type="email"
          id="email"
          value={logdata.email}
          name="email"
          required
          onChange={addData}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={logdata.password}
          name="password"
          required
          placeholder="At least 6 characters"
          onChange={addData}
        />

        <button type="submit" className="auth-button" onClick={sendData}>
          Sign-In
        </button>
      </form>

      <p className="auth-helper-text">
        By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
      </p>

      <p className="auth-helper-text">
        New to Amazon? <Link to="/register">Create your Amazon account</Link>
      </p>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default SignIn;
