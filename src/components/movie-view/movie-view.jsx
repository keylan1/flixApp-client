import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './movie-view.scss';

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [favorites, setFavorites] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movie._id);
    setFavorites(isFavorited);
  }, []);

  const removeFavorite = () => {
    fetch(
      `https://flixapptime-44f9e1282e9e.herokuapp.com/users/${user.Username}/FavoriteMovies/${movie._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setFavorites(false);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      });
  };

  const addToFavorite = () => {
    fetch(
      `https://flixapptime-44f9e1282e9e.herokuapp.com/users/${user.Username}/FavoriteMovies/${movie._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setFavorites(true);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      });
  };

  const movie = movies.find((m) => m._id === movieId);

  return (
    <Container className="movie-containers">
      <Card className="justify-content-center card-view">
        <div className="d-flex justify-content-center align-items-center aspect-ratio-container">
          <Card.Img
            crossOrigin="anonymous"
            className="justify-content-center centered-image"
            variant="top"
            style={{ position: 'fixed' }}
            src={movie.ImagePath}
          />
        </div>
        <Card.Title
          className="align-items-left ms-3"
          style={{ fontWeight: 'bold' }}>
          <span>{movie.Title}</span>
        </Card.Title>
        <Card.Body className="d-flex flex-column align-items-left justify-content-between">
          <div>
            <span style={{ fontWeight: 'bold' }}>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Genre: </span>
            {movie.Genre && (
              <>
                <span style={{ fontWeight: 'bold' }}>{movie.Genre.name}</span>
                <span>{movie.Genre.description}</span>
              </>
            )}
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Director: </span>
            {movie.Director && (
              <>
                <span>{movie.Director.name}</span>
                <span>{movie.Director.bio}</span>
              </>
            )}
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Year: </span>
            <span>{movie.Year}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Actors: </span>
            <span>{movie.Actors}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Featured: </span>
            <span>{movie.Featured}</span>
          </div>
          <div className="text-center">
            {favorites ? (
              <Button
                style={{ fontweight: 'bold' }}
                size="lg"
                className="p-2.75 mb-3"
                onClick={removeFavorite}>
                Remove from favorites
              </Button>
            ) : (
              <Button
                style={{ fontWeight: 'bold', color: 'white' }}
                size="lg"
                className="p-2.75 mb-3"
                onClick={addToFavorite}>
                Add to Favorites
              </Button>
            )}
          </div>
        </Card.Body>
        <div className="text-center">
          <Link to={`/`}>
            <Button
              size="lg"
              className="p-2.75 mb-3 back-button"
              style={{ fontWeight: 'bold', color: 'white' }}>
              Back
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
      }),
      Actors: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
};
