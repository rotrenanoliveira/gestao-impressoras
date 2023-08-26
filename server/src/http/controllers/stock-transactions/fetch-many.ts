import { makeFetchManyInkStockTransactions } from '@/use-cases/factories/ink-stock-transactions/make-fetch-many-ink-stock-transactions'
import { makeFetchManyInkStockTransactionsByInk } from '@/use-cases/factories/ink-stock-transactions/make-fetch-many-ink-stock-transactions-by-ink'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    ink: z.string().uuid(),
  })

  const parsedQuery = querySchema.safeParse(request.query)

  if (parsedQuery.success === false) {
    const fetchUseCase = makeFetchManyInkStockTransactions()
    const { transactions } = await fetchUseCase.execute()

    return reply.status(200).send({ transactions })
  }

  const { ink: inkId } = parsedQuery.data

  const fetchUseCase = makeFetchManyInkStockTransactionsByInk()
  const { transactions } = await fetchUseCase.execute(inkId)

  return reply.status(200).send({ transactions })
}
