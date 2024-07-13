import z from 'zod'

const movieSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1800).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url(),
  rate: z.number().min(0).max(10).default(5),
  genre: z.array(
    z.enum([
      'Drama',
      'Action',
      'Crime',
      'Adventure',
      'Sci-Fi',
      'Romance',
      'Animation',
      'Biography',
      'Fantasy',
      'Comedy'
    ])
  )
})

export function validateMovie (input) {
  return movieSchema.safeParse(input)
}

export function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}
