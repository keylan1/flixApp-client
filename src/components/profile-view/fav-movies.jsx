import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card.jsx';
import './fav-movies.scss';

export const FavMovies = ({ favoriteMovies }) => {
  return (
    <Container className="movie-list-container">
      <Row>
        <Col>
          <strong>Favorite Movies:</strong>
        </Col>
      </Row>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col className="mb-3" key={movie._id} md={4}>
            <MovieCard className="movie-list" movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
