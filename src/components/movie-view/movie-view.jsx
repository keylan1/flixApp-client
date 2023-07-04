export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          crossOrigin="anonymous"
          style={{ width: '400px', height: '500px' }}
          src={movie.image}
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.year}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
