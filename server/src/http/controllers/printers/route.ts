import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { getOne } from './get-one'
import { register } from './register'
import { remove } from './remove'
import { save } from './save'

export async function printerRoutes(app: FastifyInstance) {
  app.get('/printers', fetchMany)
  app.get('/printers/:printerId', getOne)

  // Register Computer
  app.post('/printers', register)

  app.patch('/printers/:printerId', save)

  app.delete('/printers/:printerId', remove)
}
