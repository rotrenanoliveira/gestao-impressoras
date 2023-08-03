import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeRegisterItemInInventory } from '@/use-cases/factories/make-register-item-in-inventory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerItem(request: FastifyRequest, reply: FastifyReply) {
  const registerItemBodySchema = z.object({
    title: z.string(),
    quantity: z.coerce.number(),
    location: z.string(),
    device_id: z.string().uuid().nullable(),
    description: z.string().nullable(),
  })

  const { title, quantity, location, device_id, description } = registerItemBodySchema.parse(request.body)

  const registerItemUseCase = makeRegisterItemInInventory()

  try {
    const { item } = await registerItemUseCase.execute({
      title,
      quantity,
      location,
      device_id,
      description,
    })

    return reply.status(201).send({ item })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send()
    }

    throw new Error('Failed to register item in inventory.')
  }
}
