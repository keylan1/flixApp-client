import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import '../../index.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Col>
      <Card className="justify-content-center">
        <div className="d-flex justify-content-center align-items-center">
          <Card.Img
            crossOrigin="anonymous"
            className="h-50, w-50"
            variant="top"
            //style={{ width: '400px', height: '500px' }}
            src={movie.ImagePath}
          />
        </div>
        <br />
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
          <Button
            size="lg"
            className="p-2.75 mb-3"
            style={{
              color: 'white',
              fontWeight: 'bold',
              maxWidth: '200px',
              maxHeight: '50px',
            }}
            onClick={onBackClick}>
            Back
          </Button>
        </div>
      </Card>
    </Col>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
