import { makeRegisterInventoryItem } from '@/use-cases/factories/inventory/make-register-item'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerInventoryItemBodySchema = z.object({
    title: z.string(),
    quantity: z.coerce.number(),
    location: z.string(),
    device_id: z.string().uuid().nullable(),
    description: z.string().nullable(),
  })

  const { title, quantity, location, device_id, description } = registerInventoryItemBodySchema.parse(request.body)

  const registerItemUseCase = makeRegisterInventoryItem()

  const { item } = await registerItemUseCase.execute({
    title,
    quantity,
    location,
    device_id,
    description,
  })

  return reply.status(201).send({ item })
}
