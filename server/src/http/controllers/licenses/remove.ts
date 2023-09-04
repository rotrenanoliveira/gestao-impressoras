import { makeRemoveLicenseUseCase } from '@/use-cases/factories/licenses/make-remove-license'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    licenseId: z.string().uuid(),
  })

  const { licenseId } = paramSchema.parse(request.params)

  const removeUseCase = makeRemoveLicenseUseCase()

  await removeUseCase.execute(licenseId)

  return reply.status(204).send()
}
