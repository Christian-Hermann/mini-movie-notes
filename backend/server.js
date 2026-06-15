import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

const PORT = 3000;

const movies = [];

app.get("/", (req, res) => {
  res.send("Mini Movie Notes API");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.post("/movies", (req, res) => {
  if (!req.body.title || !req.body.note) {
    return res.status(400).send("Title and note are required");
  }
  const newMovie = {
    id: Date.now(),
    title: req.body.title,
    note: req.body.note,
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.put("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  movies[movieIndex] = {
    id: movieId,
    title: req.body.title,
    note: req.body.note,
  };

  res.json(movies[movieIndex]);
});

app.delete("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);
  movies.splice(movieIndex, 1);

  console.log(movieIndex);
  res.send("Route deleted");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
