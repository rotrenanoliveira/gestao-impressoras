import { makeRemoveComputerUseCase } from '@/use-cases/factories/computers/make-remove-computer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    computerId: z.string().uuid(),
  })

  const { computerId } = paramSchema.parse(request.params)

  const removeComputerUseCase = makeRemoveComputerUseCase()

  await removeComputerUseCase.execute(computerId)

  return reply.status(204).send()
}
