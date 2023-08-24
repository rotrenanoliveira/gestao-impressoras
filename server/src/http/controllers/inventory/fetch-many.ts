import { makeFetchAllInventoryItems } from '@/use-cases/factories/inventory/make-fetch-all-items'
import { makeFetchManyInventoryItemsByDevice } from '@/use-cases/factories/inventory/make-fetch-many-items-by-device'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const fetchInventoryItemsQuerySchema = z.object({
    deviceId: z.string(),
  })

  const requestQuery = fetchInventoryItemsQuerySchema.safeParse(request.query)

  if (requestQuery.success === false) {
    const fetchAllInventoryUseCase = makeFetchAllInventoryItems()
    const { items } = await fetchAllInventoryUseCase.execute()

    return reply.status(200).send({ items })
  }

  const { deviceId } = requestQuery.data

  const fetchManyInventoryItemsUseCase = makeFetchManyInventoryItemsByDevice()
  const { items } = await fetchManyInventoryItemsUseCase.execute(deviceId)

  return reply.status(200).send({ items })
}
