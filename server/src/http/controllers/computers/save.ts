import { makeSaveComputerUseCase } from '@/use-cases/factories/computers/make-save-computer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    computerId: z.string().uuid(),
  })

  const { computerId } = paramSchema.parse(request.params)

  const saveBodySchema = z.object({
    name: z.string(),
    department: z.string(),
    usedBy: z.string(),
    status: z.enum(['ok', 'warning', 'danger']),
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

  const saveComputerUseCase = makeSaveComputerUseCase()
  const data = saveBodySchema.partial().parse(request.body)
  const { computer } = await saveComputerUseCase.execute(computerId, { ...data })

  return reply.status(200).send({ computer })
}
