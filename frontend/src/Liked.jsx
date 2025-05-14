import React from 'react';
import { Movies } from "./assets/data";
import { useNavigate } from 'react-router-dom';

const Likes = () => {
  const navigate = useNavigate();
  const userMovies = JSON.parse(localStorage.getItem("userReactions")) || {};
  const user = JSON.parse(localStorage.getItem("user"));
  const reactions = userMovies[user] || {};
  const likedMovies = Movies.filter((movie) => reactions[movie.id] === "like");

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>❤️ Your Liked Movies</h1>
        <div>
          <button onClick={() => navigate("/home")} style={buttonStyle}>Back</button>
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </div>
      </div>

      {likedMovies.length > 0 ? (
        <div style={gridStyle}>
          {likedMovies.map((movie) => (
            <div
              key={movie.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
              }}
            >
              <img src={movie.image} alt={movie.title} style={imageStyle} />
              <h2 style={movieTitleStyle}>{movie.Title}</h2>
              <p style={ratingStyle}> {movie.rating}</p>
              <p style={reviewStyle}>{movie.summary}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p style={emptyStyle}>You haven't liked any movies yet.</p>
      )}
    </div>
  );
};

// Inline Styles
const pageStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  background: 'linear-gradient(135deg, #dfe9f3 0%, #e2e2f2 100%)',
  minHeight: '100vh',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
};

const titleStyle = {
  margin: 0,
  color: '#333',
};

const buttonStyle = {
  padding: '8px 14px',
  marginLeft: '10px',
  border: 'none',
  backgroundColor: '#6a11cb',
  backgroundImage: 'linear-gradient(315deg, #6a11cb 0%, #2575fc 74%)',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '24px',
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '16px',
  textAlign: 'center',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imageStyle = {
  width: '160px',
  height: '240px',
  borderRadius: '8px',
  objectFit: 'cover',
};

const movieTitleStyle = {
  margin: '12px 0 6px',
  color: '#222',
};

const ratingStyle = {
  fontSize: '18px',
  margin: '4px 0',
  color: '#ffaa00',
};

const reviewStyle = {
  fontSize: '14px',
  color: '#555',
};

const emptyStyle = {
  fontSize: '16px',
  color: '#666',
  textAlign: 'center',
};

export default Likes;
