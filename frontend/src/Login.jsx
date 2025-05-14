import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('userdata')) || [];
    const auth = users.find(user => user.email === data.email && user.password === data.password);

    if (auth) {
      localStorage.setItem('user', JSON.stringify(data.email));
      alert('Login Successful');
      navigate('/home');
    } else {
      alert('Invalid User');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h1 style={titleStyle}>🎬 MovieFlix Login</h1>

        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}

        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          style={inputStyle}
        />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}

        <p style={{ textAlign: 'left', color: '#ccc', marginTop: '10px' }}>
          Don’t have an account? <Link to="/" style={{ color: '#ff4655', fontWeight: 'bold' }}>Sign Up</Link>
        </p>

        <input type="submit" value="Login" style={buttonStyle} />
      </form>
    </div>
  );
};

// 🎥 Movie-Themed Styles
const pageStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: 'url("https://wallpaperaccess.com/full/1561986.jpg")', // movie/spotlight background
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  fontFamily: 'Segoe UI, sans-serif',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1,
};

const formStyle = {
  position: 'relative',
  zIndex: 2,
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '35px 45px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  width: '340px',
  color: '#fff'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '24px',
  fontSize: '26px',
  fontWeight: '700',
  color: '#ff4655', // bright movie red
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  marginTop: '12px',
  fontWeight: 'bold',
  color: '#eee',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '14px',
  backgroundColor: 'rgba(255,255,255,0.15)',
  color: '#fff',
};

const errorStyle = {
  color: '#ff6b6b',
  fontSize: '13px',
  marginTop: '-6px',
  marginBottom: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  marginTop: '20px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#ff4655', // Netflix red
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};

export default LoginPage;
