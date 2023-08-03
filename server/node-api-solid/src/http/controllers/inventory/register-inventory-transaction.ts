import { InvalidTransactionQuantityError } from '@/use-cases/errors/invalid-transaction-quantity'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeRegisterInventoryTransaction } from '@/use-cases/factories/make-register-inventory-transaction'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerInventoryTransaction(request: FastifyRequest, reply: FastifyReply) {
  const registerInventoryTransactionParamsSchema = z.object({
    itemId: z.string().uuid(),
  })

  const { itemId: item_id } = registerInventoryTransactionParamsSchema.parse(request.params)

  const registerInventoryTransactionBodySchema = z.object({
    operator: z.string(),
    quantity: z.coerce.number(),
    transaction_type: z.enum(['insert', 'remove']).transform((value) => value.toUpperCase()),
  })

  const { operator, quantity, transaction_type } = registerInventoryTransactionBodySchema.parse(request.body)

  if (transaction_type !== 'INSERT' && transaction_type !== 'REMOVE') {
    throw new Error('Validation error, invalid transaction_type.')
  }

  const registerInventoryTransactionUseCase = makeRegisterInventoryTransaction()

  try {
    await registerInventoryTransactionUseCase.execute({
      item_id,
      operator,
      quantity,
      transaction_type,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof InvalidTransactionQuantityError) {
      return reply.status(409).send({ message: err.message })
    }

    throw new Error('Failed to register inventory transaction')
  }
}
