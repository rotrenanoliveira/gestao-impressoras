import { makeFetchManyPrinterInkUseCase } from '@/use-cases/factories/printer-ink-stock/make-fetch-many'
import { makeFetchManyInkByPrinterUseCase } from '@/use-cases/factories/printer-ink-stock/make-fetch-many-by-printer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    printer: z.string().uuid(),
  })

  const parsedQuery = querySchema.safeParse(request.query)

  if (parsedQuery.success === false) {
    const fetchManyUseCase = makeFetchManyPrinterInkUseCase()
    const { inkStock } = await fetchManyUseCase.execute()

    return reply.status(200).send({ inkStock })
  }

  const { printer: printerId } = parsedQuery.data

  const fetchManyUseCase = makeFetchManyInkByPrinterUseCase()
  const { inkStock } = await fetchManyUseCase.execute(printerId)

  return reply.status(200).send({ inkStock })
}
