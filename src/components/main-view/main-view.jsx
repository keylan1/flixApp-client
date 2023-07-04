import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Proposal',
      image:
        'https://image.tmdb.org/t/p/original/6stnAm1wSek8ZrislwK4xGTyCnt.jpg',
      description:
        'The romance genre focuses on interpersonal relationships, love, and emotional connections between characters, often involving themes of passion, affection, and romantic experiences.',
      genre: 'Romance',
      director: 'Anne Fletcher',
      year: 2009,
    },
    {
      id: 2,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      image:
        'https://image.tmdb.org/t/p/original/h0W3fjRmOQMJAIPOfhSj0Crp6Hr.jpg',
      description:
        'A hobbit named Frodo embarks on a perilous journey to destroy a powerful ring and save Middle-earth from the dark forces of Sauron.',
      genre: 'Fantasy',
      director: 'Peter Jackson',
      year: 2001,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      image:
        'https://image.tmdb.org/t/p/w440_and_h660_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      description:
        'Batman faces his ultimate challenge as he battles the Joker, a psychopathic mastermind bent on wreaking havoc on Gotham City.',
      genre: 'Action',
      director: 'Christopher Nolan',
      year: 2008,
    },
  ]);

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
