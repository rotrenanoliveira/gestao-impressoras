import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterDevice } from '@/use-cases/factories/make-register-device'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerDeviceBodySchema = z.object({
    name: z.string().min(3, { message: 'Device name must be at least 3 characters' }),
    type: z.string(),
    description: z.string().nullable(),
    acquisition_type: z.enum(['bought', 'rented']).transform((value) => value.toUpperCase()),
    status: z.enum(['ok', 'warning', 'danger']).transform((value) => value.toUpperCase()),
  })

  const { name, type, description, acquisition_type, status } = registerDeviceBodySchema.parse(request.body)

  if (acquisition_type !== 'BOUGHT' && acquisition_type !== 'RENTED') {
    throw new Error('Validation Error acquisition type must be uppercase.')
  }

  if (status !== 'OK' && status !== 'WARNING' && status !== 'DANGER') {
    throw new Error('Validation Error status must be uppercase.')
  }

  const registerDeviceUseCase = makeRegisterDevice()
  const { device } = await registerDeviceUseCase.execute({
    name,
    type,
    description,
    acquisition_type,
    status,
  })

  return reply.status(201).send({
    device,
  })
}
