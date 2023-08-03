import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RegisterItemInInventoryUseCase } from '../usecases-inventory/register-item'

export function makeRegisterItemInInventory() {
  const inventoryRepository = new PrismaInventoryRepository()
  const devicesRespository = new PrismaDevicesRepository()

  const useCase = new RegisterItemInInventoryUseCase(inventoryRepository, devicesRespository)
  return useCase
}
