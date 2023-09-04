import { makeRegisterComputerUseCase } from '@/use-cases/factories/computers/make-register-computer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    usedBy: z.string(),
    department: z.string(),
    specs: z.object({
      so: z.string(),
      ram: z.string(),
      office: z.string().nullable(),
      hostname: z.string(),
      processor: z.string(),
      storage: z.object({
        type: z.enum(['SSD', 'HDD']),
        capacity: z.coerce.number(),
      }),
    }),
  })

  const { name, department, specs, usedBy } = bodySchema.parse(request.body)

  const registerUseCase = makeRegisterComputerUseCase()

  const { computer } = await registerUseCase.execute({
    name,
    specs,
    usedBy,
    department,
  })

  return reply.status(201).send({ computer })
}
