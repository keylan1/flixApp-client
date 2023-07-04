import { useState } from 'react';
import { MovieView } from '../components/movie-view';
import { MovieCard } from '../components/movie-card';

export const MainView = () => {
  const [movies, setMovies] = useState(
    {
      id: 1,
      title: 'The Proposal',
      image: '',
      director: '',
    },
    { id: 2, title: 'Inception', image: '', director: '' },
    { id: 3, title: '', director: '' }
  );

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>No movies!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovies(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
