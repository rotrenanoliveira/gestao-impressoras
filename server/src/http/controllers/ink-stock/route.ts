import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { getOne } from './get-one'
import { register } from './register'
import { remove } from './remove'
import { save } from './save'

export async function inkStockRoutes(app: FastifyInstance) {
  app.get('/ink-stock', fetchMany)
  app.get('/ink-stock/:inkId', getOne)

  // Register Printer Ink
  app.post('/ink-stock', register)

  app.patch('/ink-stock/:inkId', save)

  app.delete('/ink-stock/:inkId', remove)
}
