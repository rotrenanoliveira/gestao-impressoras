import { makeSavePrinterInkUseCase } from '@/use-cases/factories/printer-ink-stock/make-save-printer-ink'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    inkId: z.string().uuid(),
  })

  const { inkId } = paramSchema.parse(request.params)

  const saveBodySchema = z.object({
    name: z.string(),
  })

  const { name } = saveBodySchema.parse(request.body)

  const saveUseCase = makeSavePrinterInkUseCase()
  const { ink } = await saveUseCase.execute(inkId, {
    name,
  })

  return reply.status(200).send({ ink })
}
