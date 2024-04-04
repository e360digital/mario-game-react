import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarioCharacter from '../../../assets/img/mario.png';
import './LoadingScreen.css';
import { setLoadingScreen } from '../../../config/redux/engineSlice';
import { useDispatch } from 'react-redux';

const LoadingScreen = () => {
 const [isReady, setIsReady] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [formType, setFormType] = useState('login'); // 'login' or 'register'
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
    // Set isReady to true immediately after the component mounts
    setIsReady(true);
 }, []);

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsLoading(true);
 try {
    const response = await axios.post(`http://localhost:5000/api/auth/${formType}`, { username, password });
    // Handle successful login/register (e.g., store token, redirect user)
    console.log(response.data);
    // Dispatch action to start the game only if login is successful
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
          <button onClick={() => setFormType('login')}>Login</button>
          <button onClick={() => setFormType('register')}>Register</button>
          {formType === 'login' && (
            <form onSubmit={handleSubmit}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              {isLoading && <p>Loading...</p>}
              <button type="submit">Login</button>
            </form>
          )}
          {formType === 'register' && (
            <form onSubmit={handleSubmit}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              {isLoading && <p>Loading...</p>}
              <button type="submit">Register</button>
            </form>
          )}
        </div>
      )}
    </div>
 );
};

export default LoadingScreen;
