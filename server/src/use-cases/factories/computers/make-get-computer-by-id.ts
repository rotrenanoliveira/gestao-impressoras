import { PrismaComputersRepository } from '@/repositories/prisma/prisma-computers-repository'
import { GetComputerByIdUseCase } from '@/use-cases/computers/get-by-id'

export function makeGetComputerByIdUseCase() {
  const computersRepository = new PrismaComputersRepository()
  const getComputerUseCase = new GetComputerByIdUseCase(computersRepository)
  return getComputerUseCase
}
