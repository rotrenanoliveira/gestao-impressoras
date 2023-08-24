import { makeRemoveDevice } from '@/use-cases/factories/devices/make-remove-device'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeDeviceParamsSchema = z.object({
    deviceId: z.string().uuid(),
  })

  const { deviceId } = removeDeviceParamsSchema.parse(request.params)

  const removeDeviceUseCase = makeRemoveDevice()

  await removeDeviceUseCase.execute(deviceId)

  return reply.status(204).send()
}
