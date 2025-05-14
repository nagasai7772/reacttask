import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    let existingData = JSON.parse(localStorage.getItem('userdata')) || [];
    let newData = existingData.find(exist => exist.email === data.email);

    if (newData) {
      alert('User already exists, please login');
    } else {
      existingData.push(data);
      localStorage.setItem('userdata', JSON.stringify(existingData));
      alert('User registered successfully');
      navigate('/login');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h1 style={titleStyle}>🎬 Create Account</h1>

        <label style={labelStyle} htmlFor="name">Full Name</label>
        <input
          type="text"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' }
          })}
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}

        <label style={labelStyle} htmlFor="email">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}

        <label style={labelStyle} htmlFor="password">Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
            maxLength: { value: 12, message: 'Password should not be more than 12 characters' }
          })}
          style={inputStyle}
        />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}

        <p style={{ textAlign: 'left', color: '#eee', marginTop: '10px' }}>
          Already have an account? <Link to="/login" style={{ color: '#ff4081', fontWeight: 'bold' }}>Log In</Link>
        </p>

        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
    </div>
  );
};


const pageStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: 'url("https://wallpaperaccess.com/full/1561994.jpg")', // Cinematic background
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  fontFamily: 'Segoe UI, sans-serif',
  overflow: 'hidden'
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
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '35px 45px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  width: '340px',
  color: '#fff'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '28px',
  fontWeight: '700',
  color: '#ff4081', 
};

const labelStyle = {
  display: 'block',
  marginTop: '12px',
  fontWeight: 'bold',
  color: '#eee',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '4px',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '15px',
  marginBottom: '8px',
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
  marginTop: '18px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#ff4081', 
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: '0.3s ease',
};

export default SignUp;
