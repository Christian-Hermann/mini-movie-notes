import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch("http://localhost:3000/movies");
        const data = await response.json();
        console.log(data);
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
