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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>🎬 Movie Gallery</h1>
        <div>
          <button onClick={() => navigate('/liked')} style={buttonStyle}>Likes 👍</button>
          <button onClick={() => navigate('/disliked')} style={buttonStyle}>Dislikes 👎</button>
          <button onClick={handleLogout} style={buttonStyle}>
            <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link>
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        {Movies.map((movie) => {
          let userReacted = reactions[movie.id];

          return (
            <div
              key={movie.id}
              style={{
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                transform: 'scale(1)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img src={movie.image} alt={movie.Title} width={160} height={240} style={{ borderRadius: '8px' }} />
              <h3 style={{ margin: '12px 0 6px', color: '#222' }}>{movie.Title}</h3>
              <p style={{ fontSize: '18px', margin: '4px 0', color: '#ffaa00' }}>{movie.rating}</p>
              <p style={{ fontSize: '14px', color: '#555' }}>{movie.summary}</p>
              <div style={{ margin: '12px 0' }}>
                <button
                  onClick={() => handleReactions(movie.id, 'like')}
                  disabled={userReacted}
                  style={{
                    ...reactionButtonStyle,
                    backgroundColor: '#28a745',
                    cursor: userReacted ? 'not-allowed' : 'pointer'
                  }}
                >
                  Like 👍
                </button>
                <button
                  onClick={() => handleReactions(movie.id, 'dislike')}
                  disabled={userReacted}
                  style={{
                    ...reactionButtonStyle,
                    backgroundColor: '#dc3545',
                    cursor: userReacted ? 'not-allowed' : 'pointer'
                  }}
                >
                  Dislike 👎
                </button>
              </div>
              {userReacted && <p style={{ fontWeight: 'bold', color: '#007bff' }}>You have {userReacted}d this movie</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const buttonStyle = {
  marginRight: '10px',
  padding: '8px 14px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
};

const reactionButtonStyle = {
  margin: '0 5px',
  padding: '6px 12px',
  border: 'none',
  color: 'white',
  borderRadius: '5px',
  transition: 'background-color 0.3s'
};

export default MainPage;
