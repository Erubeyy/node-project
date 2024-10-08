import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().positive().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Drama', 'Sci-Fi', 'Adventure', 'Romance', 'Animation', 'Biography', 'Fantasy'])
  )
});

function validateMovie (object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object);
}

export {
  validateMovie,
  validatePartialMovie
};
