import { PrismaLicensesRepository } from '@/repositories/prisma/prisma-licenses-repository'
import { GetLicenseByIdUseCase } from '@/use-cases/licenses/get-by-id'

export function makeGetLicenseByIdUseCase() {
  const licensesRepository = new PrismaLicensesRepository()
  const getUseCase = new GetLicenseByIdUseCase(licensesRepository)
  return getUseCase
}
