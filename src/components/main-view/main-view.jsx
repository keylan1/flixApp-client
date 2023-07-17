import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import '../../index.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://flixapptime-44f9e1282e9e.herokuapp.com/movies', {
      headers: { Authorization: `Bearer: ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const flixApi = data.map((movie) => {
          console.log(data);
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
            },
            Actors: movie.Actors,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
            Year: movie.Year,
          };
        });
        setMovies(flixApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        token={token}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="p-5" md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-5"
                        key={movie._id}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
/*         {user ? (
            <Col 
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              <br />
              or
              <br />
              <br />
              <SignupView />
            </Col>
          ) : selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          ) : movies.length === 0 ? (
            <div>No movies!</div>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <Button
                  className="m-3"
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    maxWidth: '200px',
                    maxHeight: '50px',
                  }}
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setUser(null);
                    setToken(null);
                  }}>
                  Logout
                </Button>
              </div>
              {movies.map((movie) => (
                <Col
                  className="mb-5"
                  key={movie._id}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}>
                  <MovieCard
                    style={{ border: '1px solid green' }}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </>
          )}
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

MainView.propTypes = {
  onLogout: PropTypes.func.isRequired,
};*/
