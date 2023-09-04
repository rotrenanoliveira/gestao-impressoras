import { makeRemovePrinterUseCase } from '@/use-cases/factories/printers/make-remove-printer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    printerId: z.string().uuid(),
  })

  const { printerId } = paramSchema.parse(request.params)

  const removeUseCase = makeRemovePrinterUseCase()

  await removeUseCase.execute(printerId)

  return reply.status(204).send()
}
