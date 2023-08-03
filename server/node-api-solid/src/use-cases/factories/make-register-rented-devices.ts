import { PrismaRentedDevicesRepository } from '@/repositories/prisma/prisma-rented-devices-repository'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RegisterRentedDeviceUseCase } from '../register-rented-device'

export function makeRegisterRentedDevice() {
  const rentedDevicesRepository = new PrismaRentedDevicesRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new RegisterRentedDeviceUseCase(rentedDevicesRepository, devicesRepository)

  return useCase
}
