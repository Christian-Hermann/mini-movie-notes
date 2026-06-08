import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

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

  return (
    <main>
      <h1>Mini Movie Notes</h1>
      <form>
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
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>: {movie.note}
          </li>
        ))}
      </ul>
    </main>
  );
}
export default App;
