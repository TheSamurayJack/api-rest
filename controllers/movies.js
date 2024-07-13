import { MovieModel } from '../models/lfs/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.params
    const movies = await MovieModel.getAll({ genre })
    res.status(200).json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
    return res.status(200).json(movie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) return res.status(404).json({ message: 'Movie not found' })
    return res.status(200)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }

  static async update (req, res) {
    // TODO: Implement update functionality
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updatedMovie = await MovieModel.update({ input: result.data, id })
    return res.status(201).json(updatedMovie)
  }
}
