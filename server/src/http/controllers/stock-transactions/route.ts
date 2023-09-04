import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { register } from './register'

export async function stockTransactionsRoutes(app: FastifyInstance) {
  app.get('/stock-transactions', fetchMany)

  app.post('/stock-transactions', register)
}
