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
        <span>{movie.Genre.Name}</span>
        <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <span>{movie.Director.Bio}</span>
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
