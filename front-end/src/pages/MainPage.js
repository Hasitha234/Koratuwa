// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../images/dan-burton-lrHpdJ9r7sQ-unsplash.jpg'; // Ensure the correct path to the image
import img from '../images/Asset4.png';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'koratuwa' && password === 'Koratuwa123') {
      navigate('/home'); // Redirect to '/home' on successful login
    } else {
      setError('Invalid username or password');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end', // Align to the right
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      paddingRight: '10%', // Add padding to move the form to the left
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent to show the background
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '350px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#F0AD4E',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
      <img alt="User Avatar" src={img} style={{ width: '20%', height: '20%', objectFit: 'cover' }} />
        <h1>WELCOME TO   KORATUWA  CEYLON PRODUCTS (PVT) LTD</h1>
        <input 
          type="text" 
          placeholder="User Name" 
          style={styles.input} 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button style={styles.button} onClick={handleLogin}>
          LogIn
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
