const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();
app.use(express.json());
app.use(cors());
app.disable('x-powered-by'); // Omit the 'x-powered-by: Express' header

// GET all movies or GET movies filtered by query
app.get('/movies', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }

  res.json(movies);
});

// GET Movie By Id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

// POST movie
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    res.status(400).json({ error: JSON.parse(result.error) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

// PATCH movie
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (result.error) {
    res.status(400).json({ error: JSON.parse(result.error) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  };

  movies[movieIndex] = updatedMovie;

  return res.json(updatedMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
