import { makeGetComputerByIdUseCase } from '@/use-cases/factories/computers/make-get-computer-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    computerId: z.string().uuid(),
  })

  const { computerId } = paramSchema.parse(request.params)

  const getComputerUseCase = makeGetComputerByIdUseCase()

  const { computer } = await getComputerUseCase.execute(computerId)

  return reply.status(200).send({ computer })
}
