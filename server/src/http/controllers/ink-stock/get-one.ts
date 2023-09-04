import { makeGetPrinterInkByIdUseCase } from '@/use-cases/factories/printer-ink-stock/make-get-printer-ink-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    inkId: z.string().uuid(),
  })

  const { inkId } = paramSchema.parse(request.params)

  const getUseCase = makeGetPrinterInkByIdUseCase()

  const { ink } = await getUseCase.execute(inkId)

  return reply.status(200).send({ ink })
}
