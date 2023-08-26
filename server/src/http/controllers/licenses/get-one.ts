import { makeGetLicenseByIdUseCase } from '@/use-cases/factories/licenses/make-get-license-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    licenseId: z.string().uuid(),
  })

  const { licenseId } = paramSchema.parse(request.params)

  const getUseCase = makeGetLicenseByIdUseCase()

  const { license } = await getUseCase.execute(licenseId)

  return reply.status(200).send({ license })
}
