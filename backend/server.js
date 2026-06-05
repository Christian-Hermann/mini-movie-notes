import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

const movies = [
  {
    id: 1,
    title: "The Goonies",
    note: "Best movie ever made.",
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    note: "Best action movie ever.",
  },
  {
    id: 3,
    title: "Alien Romulous",
    note: "Can watch over and over again.",
  },
];

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
    id: movies.length + 1,
    title: req.body.title,
    note: req.body.note,
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
  console.log(req.params);
  res.send("Route deleted");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
