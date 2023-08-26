import { makeRegisterPrinterInkUseCase } from '@/use-cases/factories/printer-ink-stock/make-register-printer-ink'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    printerId: z.string().uuid(),
  })

  const { name, quantity, printerId } = bodySchema.parse(request.body)

  const registerUseCase = makeRegisterPrinterInkUseCase()

  const { ink } = await registerUseCase.execute({
    name,
    quantity,
    printerId,
  })

  return reply.status(201).send({ ink })
}
