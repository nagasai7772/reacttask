import React from "react";
import { Movies } from "./assets/data";
import { useNavigate } from "react-router-dom";

const Disliked = () => {
  const navigate = useNavigate();
  const userMovies = JSON.parse(localStorage.getItem("userReactions")) || {};
  const user = JSON.parse(localStorage.getItem("user"));
  const reactions = userMovies[user] || {};
  const dislikedMovies = Movies.filter((movie) => reactions[movie.id] === "dislike");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: 0, color: '#fff' }}>👎 Disliked Movies</h1>
        <div>
          <button onClick={() => navigate("/home")} style={buttonStyle}>Back</button>
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </div>
      </div>

      {dislikedMovies.length > 0 ? (
        <div style={gridStyle}>
          {dislikedMovies.map((movie) => (
            <div
              key={movie.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
            >
              <img src={movie.image} alt={movie.title} style={imageStyle} />
              <h2 style={movieTitleStyle}>{movie.Title}</h2>
              <p style={ratingStyle}>{movie.rating}</p>
              <p style={reviewStyle}>{movie.summary}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={emptyStyle}>You haven't disliked any movies yet.</p>
      )}
    </div>
  );
};


const pageStyle = {
  padding: '20px',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  minHeight: '100vh',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
};

const buttonStyle = {
  padding: '8px 14px',
  marginLeft: '10px',
  border: 'none',
  backgroundColor: '#ff6f61',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  transition: 'background 0.3s ease',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '24px',
};

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  padding: '16px',
  textAlign: 'center',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
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
  color: '#333',
};

const ratingStyle = {
  fontSize: '18px',
  margin: '4px 0',
  color: '#ffa500',
};

const reviewStyle = {
  fontSize: '14px',
  color: '#555',
};

const emptyStyle = {
  fontSize: '16px',
  color: '#444',
  textAlign: 'center',
  marginTop: '40px',
};

export default Disliked;
