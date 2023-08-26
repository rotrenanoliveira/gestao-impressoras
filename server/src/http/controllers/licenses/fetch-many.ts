import { makeFetchManyLicensesUseCase } from '@/use-cases/factories/licenses/make-fetch-many-licenses'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchMany(_: FastifyRequest, reply: FastifyReply) {
  const fetchManyUseCase = makeFetchManyLicensesUseCase()

  const { licenses } = await fetchManyUseCase.execute()

  return reply.status(200).send({ licenses })
}
