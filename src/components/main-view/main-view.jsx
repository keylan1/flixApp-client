import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import { SearchBar } from '../search-bar/search-bar';

import { Row, Col, Form, Container } from 'react-bootstrap';

import '../../index.scss';
import './main-view.scss';
import { SearchBar } from '../search-bar/search-bar';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  //let searchMovies = movies.filter((m) => movies.includes(m.Title));
  const [filter, setFilter] = useState('');

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
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container className="main-view">
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
              path="/users/:Username"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={10}>
                      <ProfileView user={user} token={token} movies={movies} />
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
                    <Row className="d-flex justify-content-center">
                      <Col md={5}>
                        <MovieView
                          movies={movies}
                          user={user}
                          token={token}
                          setUser={setUser}
                        />
                      </Col>
                    </Row>
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
                  ) : (
                    <>
                      <Row className="mt-1 mb-1">
                        <Form.Control
                          type="text"
                          placeholder="Search..."
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        />
                      </Row>
                      {movies.length === 0 ? (
                        <Col>This list is empty!</Col>
                      ) : (
                        movies
                          .filter((movie) =>
                            movie.Title.toLowerCase().includes(
                              filter.toLowerCase()
                            )
                          )
                          .map((movie) => (
                            <Col
                              className="mb-5"
                              key={movie._id}
                              lg={3}
                              md={4}
                              sm={6}
                              xs={12}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))
                      )}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

/*<>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Row className="mt-1 mb-1">
                        <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        />
                    </Row>
                    {movies.length === 0 ? (
                      <Col>This list is empty!</Col>
                    ) : (
                      movies
                        .filter((movie) =>
                          movie.title
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                        )
                        .map((movie) => (
                          <Col className="mb-5" key={movie.id} md={4}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                    )}
                  </>
                )}
              </>*/

// original:
/*<>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>No movies!</Col>
                  ) : (
                    <>
                      <Container className="jusify-content-md-center">
                        <SearchBar movies={movies} />
                      </Container>
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
                </>*/
