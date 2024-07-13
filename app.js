import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'

const PORT = 3000

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
