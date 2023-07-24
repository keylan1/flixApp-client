import { useParams } from 'react-router';
import { Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UserInfo } from './user-info.jsx';
import { UpdateUser } from './update-user.jsx';
import { FavMovies } from './fav-movies.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';

export const ProfileView = ({ user, token, movies }) => {
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
              <Container className="user-info">
                <UserInfo
                  name={userData.Username}
                  email={userData.Email}
                  birthday={new Date(userData.Birthday).toLocaleDateString()}
                />
              </Container>
              <Container className="fav-movies">
                <FavMovies favoriteMovies={favoriteMovies} />
              </Container>
              <br />
              <>
                <div>
                  <Container className="d-flex justify-content-center update-user">
                    <Row className="">
                      <Col>
                        {updating ? (
                          <p>Updating profile...</p>
                        ) : (
                          <UpdateUser
                            className=""
                            user={user}
                            token={token}
                            setUpdating={setUpdating}
                            updateUserData={setUserData}
                          />
                        )}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </>
              <>
                <div>
                  <Container className="d-flex justify-content-end ms-10">
                    <Row>
                      <Col>
                        <Button
                          size="lg"
                          className="mb-3"
                          style={{ color: 'white', fontWeight: 'bold' }}
                          onClick={deleteProfile}>
                          Delete Profile
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </>
            </>
          )}
        </>
      )}
    </div>
  );
};
