import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { getOne } from './get-one'
import { register } from './register'
import { remove } from './remove'
import { save } from './save'

export async function licenseRoutes(app: FastifyInstance) {
  app.get('/licenses', fetchMany)
  app.get('/licenses/:licenseId', getOne)

  // Register License
  app.post('/licenses', register)

  app.patch('/licenses/:licenseId', save)

  app.delete('/licenses/:licenseId', remove)
}
