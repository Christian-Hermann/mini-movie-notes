import express from "express";

const app = express();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
