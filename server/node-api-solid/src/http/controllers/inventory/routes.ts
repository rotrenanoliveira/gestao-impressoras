import { FastifyInstance } from 'fastify'
import { registerItem } from './register-item'
import { registerInventoryTransaction } from './register-inventory-transaction'
import { fetchInventoryTransactionByItem } from './fetch-inventory-transaction-by-item'

export async function inventoryRoutes(app: FastifyInstance) {
  app.post('/inventory', registerItem)

  app.post('/inventory/:itemId/transactions', registerInventoryTransaction)
  app.get('/inventory/:itemId/transactions', fetchInventoryTransactionByItem)
}
