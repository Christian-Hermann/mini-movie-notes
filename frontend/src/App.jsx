import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import "./App.css";

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

    if (!title || !note) {
      alert("Please enter a title and note.");
      return;
    }

    if (editMovieId) {
      try {
        const response = await fetch(
          `http://localhost:3000/movies/${editMovieId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              note,
            }),
          }
        );

        const updatedMovie = await response.json();

        const updatedMovies = movies.map((movie) => {
          if (movie.id === editMovieId) {
            return updatedMovie;
          }

          return movie;
        });

        setMovies(updatedMovies);
        setTitle("");
        setNote("");
        setEditMovieId(null);
        console.log(updatedMovie);
      } catch (error) {
        console.log(error);
      }
    } else {
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
  }

  function handleEdit(movie) {
    setEditMovieId(movie.id);
    setTitle(movie.title);
    setNote(movie.note);
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
      <MovieForm
        title={title}
        note={note}
        setTitle={setTitle}
        setNote={setNote}
        handleSubmit={handleSubmit}
        editMovieId={editMovieId}
      />

      <MovieList movies={movies} onDelete={handleDelete} onEdit={handleEdit} />
    </main>
  );
}
export default App;
