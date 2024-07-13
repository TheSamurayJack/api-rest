import { readJSON } from '../../utils.js'
import { randomUUID } from 'crypto'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex !== -1) {
      movies.splice(movieIndex, 1)
      return true
    }
    return false
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async update ({ input, id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex !== -1) {
      movies[movieIndex] = { ...movies[movieIndex], ...input }
      return movies[movieIndex]
    }
  }
}
