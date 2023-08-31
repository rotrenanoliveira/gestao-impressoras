import { makeRegisterPrinterUseCase } from '@/use-cases/factories/printers/make-register-printer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    ip: z.string(),
    name: z.string(),
    department: z.string(),
    rentedIn: z.coerce.date().nullable(),
    expiresAt: z.coerce.date().nullable(),
    obs: z.string().nullable(),
  })

  const { name, department, ip, obs, rentedIn, expiresAt } = bodySchema.parse(request.body)

  const registerUseCase = makeRegisterPrinterUseCase()

  const { printer } = await registerUseCase.execute({
    ip,
    obs,
    name,
    rentedIn,
    expiresAt,
    department,
  })

  return reply.status(201).send({ printer })
}
