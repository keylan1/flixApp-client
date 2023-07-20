import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './movie-view.scss';

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  // Get the favorite movies from localStorage or set an empty array
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    // Update the favorites state when the user prop changes
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
  }, [user]);

  // Check if the movie is in the user's favorite list
  const isFavorite = favorites.includes(movie._id);

  const toggleFavorite = () => {
    // Toggle the favorite status of the movie
    const updatedFavorites = isFavorite
      ? favorites.filter((m) => m !== movie._id)
      : [...favorites, movie._id];

    // Update the list of favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Perform API call to update user's favorite list on the server
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // If successful, update the UI state
        setFavorites(updatedFavorites);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        // Revert the UI state if the API call fails
        setFavorites((prevFavorites) =>
          isFavorite
            ? prevFavorites
            : prevFavorites.filter((m) => m !== movie._id)
        );
      });
  };

  return (
    <Card className="justify-content-center card-view">
      <div className="d-flex justify-content-center align-items-center aspect-ratio-container">
        <Card.Img
          crossOrigin="anonymous"
          className="justify-content-center centered-image"
          variant="top"
          src={movie.ImagePath}
        />
      </div>
      <Card.Title
        className="align-items-left ms-3"
        style={{ fontWeight: 'bold' }}>
        <span>Title: </span>
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
      </Card.Body>
      <Card.Footer>
        <div className="text-center">
          <Button size="lg" className="p-2.75 mb-3" onClick={toggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </Card.Footer>
      <div className="text-center">
        <Link to={`/`}>
          <Button size="lg" className="p-2.75 mb-3 back-button">
            Back
          </Button>
        </Link>
      </div>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
      }),
      Actors: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
};
