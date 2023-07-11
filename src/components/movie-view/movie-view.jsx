export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          crossOrigin="anonymous"
          style={{ width: '400px', height: '500px' }}
          src={movie.ImagePath}
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        {movie.Genre && (
          <>
            <span>{movie.Genre.name}</span>
            <span>{movie.Genre.description}</span>
          </>
        )}
      </div>
      <div>
        <span>Director: </span>
        {movie.Director && (
          <>
            <span>{movie.Director.name}</span>
            <span>{movie.Director.bio}</span>
          </>
        )}
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.Actors}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
