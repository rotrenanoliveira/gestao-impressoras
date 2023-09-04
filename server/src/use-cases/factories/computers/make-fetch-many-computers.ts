import { PrismaComputersRepository } from '@/repositories/prisma/prisma-computers-repository'
import { FetchManyComputersUseCase } from '@/use-cases/computers/fetch-many'

export function makeFetchManyComputersUseCase() {
  const computersRepository = new PrismaComputersRepository()
  const fetchManyUseCase = new FetchManyComputersUseCase(computersRepository)
  return fetchManyUseCase
}
