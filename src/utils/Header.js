import React, { useEffect, useState } from 'react';
import './Header.css';
import APP_CONFIG from '../config/config';
import ProfileImage from '../images/prof.jpg';
import api from '../services/api';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState({});

  useEffect(()=> {
    const user = localStorage.getItem("user")
    if(user){
      setData(JSON.parse(user));
    }
  }, [])
  
  const handleLogout = async () => {
    localStorage.removeItem(APP_CONFIG.token);
    localStorage.removeItem(APP_CONFIG.placeholder);
    window.location.href = '/';
    try{
      await api.post(APP_CONFIG.logoutEndpoint);
      window.location.href = '/';
    } catch(err){
      alert('Logout failed. Try again.');
    }
  };

  return(
    <header className='header'>
      <h1 className='all-header-title'>Fetch's Dog Matcher🐕</h1>
      
      <div className='profile-section' onClick={() => setShowMenu(!showMenu)}>
        <div className='profile-info'>
        <p className='welcome-msg'>Welcome Dog Lover🐕,
          <br/> <strong>{data.name}🐶</strong></p>
        <img src={ProfileImage} alt='Profile' className='profile-icon'/>
      </div>
      {showMenu && (
        <div className='dropdown'>
          <button className='logout-button' onClick={handleLogout}>Logout</button>
        </div>
      )}
      </div>
    </header>
  )
}

export default Header;