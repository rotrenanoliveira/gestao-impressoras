import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { SavePrinterUseCase } from './save'
import { InMemoryPrintersRepository } from '@/repositories/in-memory/in-memory-printer-repository'

let devicesRepository: InMemoryDevicesRepository
let printersRepository: InMemoryPrintersRepository
let sut: SavePrinterUseCase

describe('Save printer use case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    printersRepository = new InMemoryPrintersRepository()
    sut = new SavePrinterUseCase(devicesRepository, printersRepository)
  })

  it('should be able to save printer', async () => {
    const device = await devicesRepository.create({
      name: 'OKI 4172',
      department: 'IT',
    })

    const { id: printerId } = await printersRepository.create({
      deviceId: device.id,
      ip: '0.0.0.1',
      rentedIn: new Date('2020, 10, 28'),
      expiresAt: new Date('2023, 10, 28'),
      obs: null,
    })

    const { printer } = await sut.execute(printerId, {
      name: 'OKI 4279',
      status: 'warning',
      ip: '10.0.0.1',
    })

    expect(printer).toEqual(
      expect.objectContaining({
        id: printer.id,
        deviceId: printer.deviceId,
        ip: '10.0.0.1',
      }),
    )

    expect(devicesRepository.items[0]).toEqual(
      expect.objectContaining({
        id: device.id,
        status: 'warning',
        name: 'OKI 4279',
      }),
    )
  })
})
