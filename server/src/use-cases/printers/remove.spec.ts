import { beforeEach, describe, expect, it } from 'vitest'
import { RemovePrinterUseCase } from './remove'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { InMemoryPrintersRepository } from '@/repositories/in-memory/in-memory-printer-repository'

let devicesRepository: InMemoryDevicesRepository
let printersRepository: InMemoryPrintersRepository
let sut: RemovePrinterUseCase

describe('Remove printer use case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    printersRepository = new InMemoryPrintersRepository()
    sut = new RemovePrinterUseCase(devicesRepository, printersRepository)
  })

  it('should be able to remove printer', async () => {
    const { id: deviceId } = await devicesRepository.create({
      name: 'printer',
      department: 'IT',
    })

    const { id: printerId } = await printersRepository.create({
      deviceId: deviceId,
      ip: '0.0.0.1',
      rentedIn: new Date('2020, 10, 28'),
      expiresAt: new Date('2023, 10, 28'),
      obs: null,
    })

    await sut.execute(printerId)

    expect(devicesRepository.items).toHaveLength(0)
    expect(printersRepository.items).toHaveLength(0)
  })
})
