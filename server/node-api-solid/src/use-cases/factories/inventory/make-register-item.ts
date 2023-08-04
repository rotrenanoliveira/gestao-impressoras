import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { RegisterItemInInventoryUseCase } from '@/use-cases/usecases-inventory/register-item'

export function makeRegisterInventoryItem() {
  const inventoryRepository = new PrismaInventoryRepository()
  const deviceRepository = new PrismaDevicesRepository()
  const useCase = new RegisterItemInInventoryUseCase(inventoryRepository, deviceRepository)

  return useCase
}
