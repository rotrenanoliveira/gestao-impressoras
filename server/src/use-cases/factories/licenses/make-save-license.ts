import { PrismaLicensesRepository } from '@/repositories/prisma/prisma-licenses-repository'
import { SaveLicenseUseCase } from '@/use-cases/licenses/save'

export function makeSaveLicenseUseCase() {
  const licensesRepository = new PrismaLicensesRepository()
  const saveUseCase = new SaveLicenseUseCase(licensesRepository)
  return saveUseCase
}
