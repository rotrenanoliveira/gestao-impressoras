import { makeSaveItem } from '@/use-cases/factories/inventory/make-save-item'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const removeInventoryItemParamsSchema = z.object({
    itemId: z.string().uuid(),
  })

  const { itemId } = removeInventoryItemParamsSchema.parse(request.params)

  const saveInventoryItemBodySchema = z.object({
    title: z.string(),
    location: z.string(),
    device_id: z.string().uuid().nullable(),
    description: z.string().nullable(),
  })

  const requestBody = saveInventoryItemBodySchema.partial().parse(request.body)

  const saveInventoryItemUseCase = makeSaveItem()
  const { item } = await saveInventoryItemUseCase.execute(itemId, { ...requestBody })

  return reply.status(200).send({ item })
}
