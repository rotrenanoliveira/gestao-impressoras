import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRentedDevicesRepository } from '@/repositories/in-memory/in-memory-rented-devices-repository'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { RegisterRentedDeviceUseCase } from './register-rented-device'
import { ResourceNotFound } from './errors/resource-not-found'

let rentedDevicesRepository: InMemoryRentedDevicesRepository
let devicesRepository: InMemoryDevicesRepository
let sut: RegisterRentedDeviceUseCase

describe.skip('Register Rented Device Use Case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    rentedDevicesRepository = new InMemoryRentedDevicesRepository()
    sut = new RegisterRentedDeviceUseCase(rentedDevicesRepository, devicesRepository)
  })

  it('should be able to register rented device', async () => {
    const createdDevice = await devicesRepository.create({
      name: 'OKI 4172',
      status: 'OK',
      type: 'printer',
      acquisition_type: 'BOUGHT',
      description: 'Impressora localizado no PCP',
    })

    await sut.execute({
      device_id: createdDevice.id,
      supplier: 'supplier-01',
      rented_in: new Date('2023, 08, 01'),
      contract_expiration: new Date('2026, 08, 01'),
      obs: null,
    })

    expect(rentedDevicesRepository.items[0].contract_expiration).toEqual(new Date('2026, 08, 01'))
  })

  it('should not be able to register rented device with invalid device ID', async () => {
    await expect(() =>
      sut.execute({
        device_id: 'non-existent-device',
        supplier: 'supplier-01',
        rented_in: new Date('2023, 07, 01'),
        contract_expiration: new Date('2026, 07, 01'),
        obs: null,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
