import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { UserInfo } from './user-info.jsx';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { FavoriteMovies } from './favorite-movies.jsx';
import { UpdateUser } from './update-user.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';

export const ProfileView = ({ user, token, movies, setFavorites }) => {
  const [userData, setUserData] = useState(user);
  const { Username } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  let favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  // Make the GET request to fetch the user
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`https://flixapptime-44f9e1282e9e.herokuapp.com/users/${Username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching user data: ${error}`);
        setLoading(false);
      });
  }, [Username, token]);

  useEffect(() => {
    if (user && userData && user._id === userData._id) {
      // Update the user prop with the updated data
      setUserData(user);
    }
  }, [user]);

  //delete profile
  const deleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      fetch(
        `https://flixapptime-44f9e1282e9e.herokuapp.com/users/${user.Username}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Clear local storage and redirect to login page after successful deletion
          localStorage.clear();
          window.location.replace('/login');
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="profile-view">
      {loading ? ( // Show loading message while data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          {userData && (
            <>
              <Container>
                <h1>User Profile</h1>
                <div>
                  <strong>Username:</strong> {userData.Username}
                </div>
                <div>
                  <strong>Email:</strong> {userData.Email}
                </div>
                <div>
                  <strong>Birthday:</strong>
                  {new Date(userData.Birthday).toLocaleDateString()}
                </div>
              </Container>
              <Container className="mb-100">
                <strong>Favorite Movies:</strong>
                <Row>
                  {favoriteMovies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={4}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              </Container>
              <br />
              <>
                {updating ? (
                  <p>Updating profile...</p>
                ) : (
                  <UpdateUser
                    user={user}
                    token={token}
                    setUpdating={setUpdating}
                    updateUserData={setUserData}
                  />
                )}
              </>
              <div className="profile-view">
                <Button
                  size="lg"
                  className="p-2.75 mb-3"
                  onClick={deleteProfile}>
                  Delete Profile
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
