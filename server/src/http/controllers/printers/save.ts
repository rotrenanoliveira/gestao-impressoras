import { makeSavePrinterUseCase } from '@/use-cases/factories/printers/make-save-printer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    printerId: z.string().uuid(),
  })

  const { printerId } = paramSchema.parse(request.params)

  const saveBodySchema = z.object({
    ip: z.string(),
    name: z.string(),
    department: z.string(),
    rentedIn: z.coerce.date(),
    expiresAt: z.coerce.date(),
    status: z.enum(['ok', 'warning', 'danger']),
    obs: z.string(),
  })

  const saveUseCase = makeSavePrinterUseCase()
  const data = saveBodySchema.partial().parse(request.body)
  const { printer } = await saveUseCase.execute(printerId, { ...data })

  return reply.status(200).send({ printer })
}
