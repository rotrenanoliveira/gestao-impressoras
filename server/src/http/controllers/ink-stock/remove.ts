import { makeRemovePrinterInkUseCase } from '@/use-cases/factories/printer-ink-stock/make-remove-printer-ink'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    inkId: z.string().uuid(),
  })

  const { inkId } = paramSchema.parse(request.params)

  const removeUseCase = makeRemovePrinterInkUseCase()

  await removeUseCase.execute(inkId)

  return reply.status(204).send()
}
