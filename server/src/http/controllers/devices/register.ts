import { makeRegisterDevice } from '@/use-cases/factories/devices/make-register-device'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerDeviceBodySchema = z.object({
    name: z.string().min(3, { message: 'Device name must be at least 3 characters' }),
    type: z.string(),
    acquisition_type: z.enum(['bought', 'rented']).transform((value) => value.toUpperCase()),
    status: z.enum(['ok', 'warning', 'danger']).transform((value) => value.toUpperCase()),
    supplier: z.string(),
    contract_expiration: z.coerce.date().nullable(),
    rented_in: z.coerce.date().nullable(),
    description: z.string().nullable(),
    obs: z.string().nullable(),
  })

  const { name, type, acquisition_type, status, supplier, contract_expiration, rented_in, description, obs } =
    registerDeviceBodySchema.parse(request.body)

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
    status,
    supplier,
    acquisition_type,
    contract_expiration,
    description,
    rented_in,
    obs,
  })

  return reply.status(201).send({ device })
}
