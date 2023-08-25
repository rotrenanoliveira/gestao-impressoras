import { makeGetPrinterByIdUseCase } from '@/use-cases/factories/printers/make-get-printer-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    printerId: z.string().uuid(),
  })

  const { printerId } = paramSchema.parse(request.params)

  const getPrinterUseCase = makeGetPrinterByIdUseCase()

  const { printer } = await getPrinterUseCase.execute(printerId)

  return reply.status(200).send({ printer })
}
