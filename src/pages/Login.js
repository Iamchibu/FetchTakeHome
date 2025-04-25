import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import APP_CONFIG from '../config/config';
import api from '../services/api';
import DogLogin from '../images/dog_login.jpeg';
import './Login.css';

function Login( { onLoginSuccess }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //for login button..
  const handlelogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const payload = { 
      name, 
      email
    };

    try{
      localStorage.removeItem("user")
      await api.post(APP_CONFIG.loginEndpoint, payload);
      
      onLoginSuccess();//lift the login state
      navigate('/dogs');//go to dogs

      //saving token in local db..
      localStorage.setItem(APP_CONFIG.token, APP_CONFIG.placeholder);
      localStorage.setItem("user", JSON.stringify(payload));
    } catch (err){
      setError('Login failed');
    } finally{
      setIsLoading(false);
    }
  }

  return(
    <main className="login-container">
      <div className="login-image-section">
        <img src={DogLogin} alt="Login Dog"/>
      </div>
      <div className="login-form-section">
      <div className='dog-header'>
      <h1 className='dog-header-title'>Fetch's Dog Matcher🐕</h1>
      <h4 className='dog-header-subtitle'>We love Dogs, and hope you do too!</h4>
      </div>

      <form onSubmit={handlelogin} aria-describedby='login-error'>
        <div>
          <label className='login-label-name' htmlFor='login-name'>Name</label>
          <input
            id="login-name"
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            aria-required="true">
          </input>
        </div>

        <div>
          <label className='login-label-email' htmlFor='login-email'>Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-required="true">
          </input>
        </div>

        <button className='login-button' type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
        {error && (
          <div
          className='error-text'
          role="alert"
          id="login-error"
          style={{ color: 'red', marginTop: '1rem' }}>
            {error}
          </div>
        )}
      </form>
      </div>
    </main>
  )
}

export default Login;