import { makeRemoveItem } from '@/use-cases/factories/inventory/make-remove-item'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeInventoryItemParamsSchema = z.object({
    itemId: z.string().uuid(),
  })

  const { itemId } = removeInventoryItemParamsSchema.parse(request.params)

  const removeInventoryItemUseCase = makeRemoveItem()

  await removeInventoryItemUseCase.execute(itemId)

  return reply.status(204).send()
}
