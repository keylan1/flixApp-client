import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
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

/*MovieView.propTypes = {
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
};*/
