import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
  const [movies, setMovies] = useState(
    {
      id: 1,
      title: 'The Proposal',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg',
      director: 'Marijn Haverbeke',
    },
    {
      id: 2,
      title: 'Inception',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
      director: 'Federico Kereki',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg',
      director: 'Douglas Crockford',
    }
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
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
