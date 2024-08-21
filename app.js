import express, { json } from 'express';
import cors from 'cors';
import { moviesRouter } from './routes/movies.js';

const app = express();
app.use(json());
app.use(cors());
app.disable('x-powered-by'); // Omit the 'x-powered-by: Express' header

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
