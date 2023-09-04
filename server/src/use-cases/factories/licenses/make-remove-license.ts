import { PrismaLicensesRepository } from '@/repositories/prisma/prisma-licenses-repository'
import { RemoveLicenseUseCase } from '@/use-cases/licenses/remove'

export function makeRemoveLicenseUseCase() {
  const licensesRepository = new PrismaLicensesRepository()
  const removeUseCase = new RemoveLicenseUseCase(licensesRepository)
  return removeUseCase
}
