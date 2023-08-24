import { makeGetInventoryItem } from '@/use-cases/factories/inventory/make-get-item-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const getInventoryItemParamsSchema = z.object({
    itemId: z.string().uuid(),
  })

  const { itemId } = getInventoryItemParamsSchema.parse(request.params)

  const getInventoryItemUseCase = makeGetInventoryItem()
  const { item } = await getInventoryItemUseCase.execute(itemId)

  return reply.status(200).send({ item })
}
