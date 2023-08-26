import { makeRegisterLicenseUseCase } from '@/use-cases/factories/licenses/make-register-license'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    description: z.string(),
    initAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    obs: z.string().nullable(),
    price: z.object({
      value: z.coerce.number(),
      currency: z.enum(['USD', 'BRL', 'EUR']),
    }),
  })

  const { description, price, obs, expiresAt, initAt } = bodySchema.parse(request.body)

  const registerUseCase = makeRegisterLicenseUseCase()

  const { license } = await registerUseCase.execute({
    description,
    price,
    obs,
    expiresAt,
    initAt,
  })

  return reply.status(201).send({ license })
}
