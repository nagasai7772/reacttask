import React, { useEffect, useState } from 'react';
import { Movies } from "./assets/data";
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  let navigate = useNavigate();
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
    if (user && userReactions[user]) {
      setReactions(userReactions[user]);
    }
  }, []);

  const handleReactions = (movieId, movieReaction) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Login First');
      return;
    }

    if (!reactions[movieId]) {
      const newReactions = { ...reactions, [movieId]: movieReaction };
      setReactions(newReactions);

      const allUserReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
      allUserReactions[user] = newReactions;
      localStorage.setItem('userReactions', JSON.stringify(allUserReactions));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={pageStyle}>
      <div style={navbarStyle}>
        <h1 style={titleStyle}>🎬 Movie Gallery</h1>
        <div>
          <button onClick={() => navigate('/liked')} style={buttonStyle}>Likes 👍</button>
          <button onClick={() => navigate('/disliked')} style={buttonStyle}>Dislikes 👎</button>
          <button onClick={handleLogout} style={buttonStyle}>
            <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link>
          </button>
        </div>
      </div>

      <div style={movieGridStyle}>
        {Movies.map((movie) => {
          let userReacted = reactions[movie.id];

          return (
            <div
              key={movie.id}
              style={movieCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
            >
              <img src={movie.image} alt={movie.Title} style={movieImageStyle} />
              <div style={movieInfoStyle}>
                <h3 style={movieTitleStyle}>{movie.Title}</h3>
                <p style={movieRatingStyle}>{movie.rating}</p>
                <p style={movieSummaryStyle}>{movie.summary}</p>
                <div style={reactionButtonContainer}>
                  <button
                    onClick={() => handleReactions(movie.id, 'like')}
                    disabled={userReacted}
                    style={{ ...reactionButtonStyle, backgroundColor: '#28a745' }}
                  >
                    Like 👍
                  </button>
                  <button
                    onClick={() => handleReactions(movie.id, 'dislike')}
                    disabled={userReacted}
                    style={{ ...reactionButtonStyle, backgroundColor: '#dc3545' }}
                  >
                    Dislike 👎
                  </button>
                </div>
                {userReacted && <p style={userReactionText}>You have {userReacted}d this movie</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const pageStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#141414',
  color: '#fff',
  padding: '20px',
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '10px 20px',
  backgroundColor: '#000',
  borderRadius: '8px',
};

const titleStyle = {
  margin: 0,
  color: '#e50914',
  fontSize: '32px',
  fontWeight: '700',
};

const buttonStyle = {
  marginRight: '10px',
  padding: '8px 14px',
  border: 'none',
  backgroundColor: '#e50914',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const movieGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '24px',
};

const movieCardStyle = {
  borderRadius: '12px',
  padding: '16px',
  backgroundColor: '#333',
  textAlign: 'center',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  overflow: 'hidden',
};

const movieImageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};

const movieInfoStyle = {
  paddingTop: '12px',
};

const movieTitleStyle = {
  margin: '12px 0 6px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#fff',
};

const movieRatingStyle = {
  fontSize: '18px',
  color: '#ffaa00',
};

const movieSummaryStyle = {
  fontSize: '14px',
  color: '#bbb',
};

const reactionButtonContainer = {
  marginTop: '12px',
};

const reactionButtonStyle = {
  margin: '0 5px',
  padding: '8px 16px',
  border: 'none',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const userReactionText = {
  fontWeight: 'bold',
  color: '#007bff',
  marginTop: '10px',
};

export default MainPage;
