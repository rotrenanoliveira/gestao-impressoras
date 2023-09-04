import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { getOne } from './get-one'
import { register } from './register'
import { remove } from './remove'
import { save } from './save'

export async function computerRoutes(app: FastifyInstance) {
  app.get('/computers', fetchMany)
  app.get('/computers/:computerId', getOne)

  // Register Computer
  app.post('/computers', register)

  app.put('/computers/:computerId', save)

  app.delete('/computers/:computerId', remove)
}
