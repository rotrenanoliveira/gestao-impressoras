import { makeGetDevice } from '@/use-cases/factories/devices/make-get-device-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const getDeviceParamsSchema = z.object({
    deviceId: z.string().uuid(),
  })

  const { deviceId } = getDeviceParamsSchema.parse(request.params)

  const getDeviceByIdUseCase = makeGetDevice()

  const { device } = await getDeviceByIdUseCase.execute(deviceId)

  return reply.status(200).send({ device })
}
