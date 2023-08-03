import { makeFetchInventoryTransactionsByItemId } from '@/use-cases/factories/make-fetch-inventory-transactions-by-item-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchInventoryTransactionByItem(request: FastifyRequest, reply: FastifyReply) {
  const getInventoryTransactionParamsSchema = z.object({
    itemId: z.string().uuid(),
  })

  const { itemId: item_id } = getInventoryTransactionParamsSchema.parse(request.params)

  const fetchInventoryTransactionByItemUseCase = makeFetchInventoryTransactionsByItemId()

  const { transactions } = await fetchInventoryTransactionByItemUseCase.execute({ item_id })

  return reply.status(200).send({
    transactions,
  })
}
