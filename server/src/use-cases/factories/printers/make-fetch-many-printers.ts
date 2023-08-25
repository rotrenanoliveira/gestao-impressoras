import { PrismaPrintersRepository } from '@/repositories/prisma/prisma-printers-repository'
import { FetchManyPrintersUseCase } from '@/use-cases/printers/fetch-many'

export function makeFetchManyPrintersUseCase() {
  const printersRepository = new PrismaPrintersRepository()
  const fetchManyUseCase = new FetchManyPrintersUseCase(printersRepository)
  return fetchManyUseCase
}
