import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { getOne } from './get-one'
import { register } from './register'
import { remove } from './remove'
import { save } from './save'

export async function deviceRoutes(app: FastifyInstance) {
  app.get('/devices', fetchMany)
  app.get('/devices/:deviceId', getOne)

  app.post('/devices', register)

  app.put('/devices/:deviceId', save)

  app.delete('/devices/:deviceId', remove)
}
