import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [editMovieId, setEditMovieId] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch("http://localhost:3000/movies");
        const data = await response.json();

        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }

    getMovies();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          note,
        }),
      });

      const newMovie = await response.json();
      setMovies([...movies, newMovie]);

      setTitle("");
      setNote("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      });

      const updatedMovies = movies.filter((movie) => movie.id !== id);

      setMovies(updatedMovies);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h1>Mini Movie Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Movie note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <button type="submit">
          {editMovieId ? "Update Movie" : "Add Movie"}
        </button>
      </form>
      <p>Editing Movie ID: {editMovieId}</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>: {movie.note}
            <button
              onClick={() => {
                setEditMovieId(movie.id),
                  setTitle(movie.title),
                  setNote(movie.note);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default App;
