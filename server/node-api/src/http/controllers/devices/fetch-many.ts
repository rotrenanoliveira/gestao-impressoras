import { makeFetchAllDevices } from '@/use-cases/factories/devices/make-fetch-all-devices'
import { makeFetchManyDevicesByType } from '@/use-cases/factories/devices/make-fetch-may-devices-by-type'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const fetchDevicesQuerySchema = z.object({
    type: z.string(),
  })

  const requestQuery = fetchDevicesQuerySchema.safeParse(request.query)

  if (requestQuery.success === false) {
    const fetchAllDevicesUseCase = makeFetchAllDevices()
    const { devices } = await fetchAllDevicesUseCase.execute()

    return reply.status(200).send({ devices })
  }

  const { type } = requestQuery.data

  const fetchDeviceByTypeUseCase = makeFetchManyDevicesByType()
  const { devices } = await fetchDeviceByTypeUseCase.execute(type)

  return reply.status(200).send({ devices })
}
