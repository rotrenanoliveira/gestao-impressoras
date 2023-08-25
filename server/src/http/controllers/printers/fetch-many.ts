import { makeFetchManyPrintersUseCase } from '@/use-cases/factories/printers/make-fetch-many-printers'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const fetchManyUseCase = makeFetchManyPrintersUseCase()

  const { printers } = await fetchManyUseCase.execute()

  return reply.status(200).send({ printers })
}
