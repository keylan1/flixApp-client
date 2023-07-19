import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ user, movies }) => {
  const movieList = movies.filter((movie) => {
    return movie._id === user.FavoriteMovies._id;
  });

  /* const deleteMovie = ((movie), onClick) => {

  }*/
  return (
    <>
      <p>Here are your favorited movies: </p>
      <>
        {movieList.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </>
      <Button></Button>
    </>
  );
};
