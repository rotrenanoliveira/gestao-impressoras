import { makeSaveDevice } from '@/use-cases/factories/devices/make-save-device'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const saveDeviceParamsSchema = z.object({
    deviceId: z.string().uuid(),
  })

  const { deviceId } = saveDeviceParamsSchema.parse(request.params)

  const saveDeviceBodySchema = z.object({
    type: z.string(),
    supplier: z.string(),
    name: z.string().min(3, { message: 'Device name must be at least 3 characters' }),
    status: z.enum(['ok', 'warning', 'danger']).transform((value) => value.toUpperCase()),
    acquisition_type: z.enum(['bought', 'rented']).transform((value) => value.toUpperCase()),
    contract_expiration: z.coerce.date().nullable(),
    rented_in: z.coerce.date().nullable(),
    description: z.string().nullable(),
    obs: z.string().nullable(),
  })

  const requestBody = saveDeviceBodySchema.partial().parse(request.body)

  const { status, acquisition_type } = requestBody

  if (acquisition_type !== undefined && acquisition_type !== 'BOUGHT' && acquisition_type !== 'RENTED') {
    throw new Error('Validation Error acquisition type must be uppercase.')
  }

  if (status !== undefined && status !== 'OK' && status !== 'WARNING' && status !== 'DANGER') {
    throw new Error('Validation Error status must be uppercase.')
  }

  const saveDeviceUseCase = makeSaveDevice()

  const { device } = await saveDeviceUseCase.execute(deviceId, {
    ...requestBody,
    acquisition_type,
    status,
  })

  return reply.status(200).send({ device })
}
