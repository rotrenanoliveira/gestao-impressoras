import { makeRegisterStockTransaction } from '@/use-cases/factories/ink-stock-transactions/make-register-ink-stock-transaction'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    inkId: z.string().uuid(),
    operator: z.string(),
    transaction: z.enum(['insert', 'remove']),
  })

  const { inkId, operator, transaction: transactionType } = bodySchema.parse(request.body)

  const registerUseCase = makeRegisterStockTransaction()
  const { transaction } = await registerUseCase.execute({
    inkId,
    operator,
    transaction: transactionType,
  })

  return reply.status(201).send({ transaction })
}
