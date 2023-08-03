import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeRegisterRentedDevice } from '@/use-cases/factories/make-register-rented-devices'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerRentedDevice(request: FastifyRequest, reply: FastifyReply) {
  const registerRentedDeviceBodySchema = z.object({
    device_id: z.string().uuid(),
    supplier: z.string(),
    rented_in: z.coerce.date(),
    contract_expiration: z.coerce.date(),
    obs: z.string().nullable(),
  })

  const { device_id, supplier, rented_in, contract_expiration, obs } = registerRentedDeviceBodySchema.parse(
    request.body,
  )

  const registerRentedDeviceUseCase = makeRegisterRentedDevice()

  try {
    await registerRentedDeviceUseCase.execute({
      device_id,
      supplier,
      rented_in,
      contract_expiration,
      obs,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    throw new Error('Failed to register rented device')
  }
}
