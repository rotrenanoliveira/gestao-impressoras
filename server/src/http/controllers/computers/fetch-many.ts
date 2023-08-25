import { makeFetchManyComputersUseCase } from '@/use-cases/factories/computers/make-fetch-many-computers'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const fetchManyUseCase = makeFetchManyComputersUseCase()

  const { computers } = await fetchManyUseCase.execute()

  return reply.status(200).send({ computers })
}
