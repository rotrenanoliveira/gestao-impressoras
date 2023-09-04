import { PrismaLicensesRepository } from '@/repositories/prisma/prisma-licenses-repository'
import { RegisterLicenseUseCase } from '@/use-cases/licenses/register'

export function makeRegisterLicenseUseCase() {
  const licensesRepository = new PrismaLicensesRepository()
  const registerUseCase = new RegisterLicenseUseCase(licensesRepository)
  return registerUseCase
}
