import { PrismaLicensesRepository } from '@/repositories/prisma/prisma-licenses-repository'
import { FetchManyLicensesUseCase } from '@/use-cases/licenses/fetch-many'

export function makeFetchManyLicensesUseCase() {
  const licensesRepository = new PrismaLicensesRepository()
  const fetchUseCase = new FetchManyLicensesUseCase(licensesRepository)
  return fetchUseCase
}
