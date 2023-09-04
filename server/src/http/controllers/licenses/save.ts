import { makeSaveLicenseUseCase } from '@/use-cases/factories/licenses/make-save-license'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    licenseId: z.string().uuid(),
  })

  const { licenseId } = paramSchema.parse(request.params)

  const saveBodySchema = z.object({
    description: z.string(),
    initAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    obs: z.string(),
    price: z.object({
      value: z.coerce.number(),
      currency: z.enum(['USD', 'BRL', 'EUR']),
    }),
  })

  const saveUseCase = makeSaveLicenseUseCase()
  const data = saveBodySchema.partial().parse(request.body)
  const { license } = await saveUseCase.execute(licenseId, { ...data })

  return reply.status(200).send({ license })
}
