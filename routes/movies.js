import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const moviesRouter = Router();

// GET all movies or GET movies filtered by query
moviesRouter.get('/', MovieController.getAll);
// POST movie
moviesRouter.post('/', MovieController.create);
// GET Movie By Id
moviesRouter.get('/:id', MovieController.getById);
// DELETE movie
moviesRouter.delete('/:id', MovieController.delete);
// PATCH movie
moviesRouter.patch('/:id', MovieController.update);
