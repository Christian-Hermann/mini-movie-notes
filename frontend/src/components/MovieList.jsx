function MovieList({ movies, onDelete, onEdit }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <strong>{movie.title}</strong>: {movie.note}
          <button onClick={() => onEdit(movie)}>Edit</button>
          <button onClick={() => onDelete(movie.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
