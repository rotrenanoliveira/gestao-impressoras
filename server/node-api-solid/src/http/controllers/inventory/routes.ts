import { FastifyInstance } from 'fastify'
import { fetchMany } from './fetch-many'
import { getOne } from './get-one'
import { register } from './register-item'
import { remove } from './remove'
import { save } from './save'

export async function inventoryRoutes(app: FastifyInstance) {
  // Inventory Routes
  app.get('/inventory', fetchMany)
  app.get('/inventory/:itemId', getOne)

  app.post('/inventory', register)

  app.put('/inventory/:itemId', save)

  app.delete('/inventory/:itemId', remove)

  // app.post('/inventory/:itemId/transactions', registerInventoryTransaction)
  // app.get('/inventory/:itemId/transactions', fetchInventoryTransactionByItem)
}
