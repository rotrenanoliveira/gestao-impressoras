import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RegisterDeviceUseCase } from '../register-device'

export function makeRegisterDevice() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new RegisterDeviceUseCase(devicesRepository)

  return useCase
}
