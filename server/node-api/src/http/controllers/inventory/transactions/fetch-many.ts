import { makeFetchAllInventoryTransactions } from '@/use-cases/factories/inventory/transactions/make-fetch-all-transactions'
import { makeFetchInventoryTransactionsByItem } from '@/use-cases/factories/inventory/transactions/make-fetch-many-transactions-by-item'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchManyTransactions(request: FastifyRequest, reply: FastifyReply) {
  const fetchInventoryItemsQuerySchema = z.object({
    itemId: z.string(),
  })

  const requestQuery = fetchInventoryItemsQuerySchema.safeParse(request.query)

  if (requestQuery.success === false) {
    const fetchAllInventoryTransactionsUseCase = makeFetchAllInventoryTransactions()
    const { transactions } = await fetchAllInventoryTransactionsUseCase.execute()

    return reply.status(200).send({ transactions })
  }

  const { itemId } = requestQuery.data

  const fetchManyInventoryTransactionsByItemUseCase = makeFetchInventoryTransactionsByItem()
  const { transactions } = await fetchManyInventoryTransactionsByItemUseCase.execute({ itemId })

  return reply.status(200).send({ transactions })
}
