import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarioCharacter from '../../../assets/img/mario.png';
import './LoadingScreen.css';
import { setLoadingScreen } from '../../../config/redux/engineSlice';
import { useDispatch } from 'react-redux';
import Modal from './Modal';

const LoadingScreen = () => {
  
 const [isReady, setIsReady] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [formType, setFormType] = useState('login');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const dispatch = useDispatch();
 const [isModalOpen, setIsModalOpen] = useState(false);

 const openModal = () => setIsModalOpen(true);
 const closeModal = () => setIsModalOpen(false);

 useEffect(() => {
   setIsReady(true);
 }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
     const response = await axios.post(`http://localhost:5000/api/auth/${formType}`, { username, password });
     console.log(response.data);
  
     localStorage.setItem('token', response.data.token);

     if (formType === 'login') {
       dispatch(setLoadingScreen(false));
     }
  } catch (error) {
     console.error('Error logging in/registering', error);
  } finally {
     setIsLoading(false);
  }
 };
 


 return (
  <div className="loading-screen-container">
    <img src={MarioCharacter} alt="" className="loading-mario" />
    {!isReady && <h1 className="loading-title">Loading...</h1>}
    {isReady && (
      <div>
        <button onClick={() => setIsModalOpen(true)}>Start GAME!</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="auth-forms">
            <button className="auth-toggle" onClick={() => setFormType('login')}>Login</button>
            <button className="auth-toggle" onClick={() => setFormType('register')}>Register</button>
            {formType === 'login' && (
              <form onSubmit={handleSubmit} className="auth-form">
               <input className="auth-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
               <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
               {isLoading && <p className="auth-loading">Loading...</p>}
               <button className="auth-submit" type="submit">Login</button>
              </form>
            )}
            {formType === 'register' && (
              <form onSubmit={handleSubmit} className="auth-form">
               <input className="auth-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
               <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
               {isLoading && <p className="auth-loading">Loading...</p>}
               <button className="auth-submit" type="submit">Register</button>
              </form>
            )}
          </div>
        </Modal>
      </div>
    )}
  </div>
);

};

export default LoadingScreen;