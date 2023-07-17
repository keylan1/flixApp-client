import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 card-custom">
      <div className="aspect-ratio-container">
        <Card.Img
          className="card-img-top"
          style={{ width: '100%', objectFit: 'cover' }}
          variant="top"
          src={movie.ImagePath}
        />
      </div>
      <Card.Body className="d-flex flex-column align-items-center justify-content-between">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="justify-content">{movie.Description}</Card.Text>
        <div className="mt-auto">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="primary">More Info</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
