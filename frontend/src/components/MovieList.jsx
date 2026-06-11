function MovieList({ movies, onDelete }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <strong>{movie.title}</strong>: {movie.note}
          <button onClick={() => onDelete(movie.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
