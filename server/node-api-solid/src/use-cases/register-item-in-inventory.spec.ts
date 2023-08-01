import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { RegisterItemInInventoryUseCase } from './register-item-in-inventory'
import { ResourceNotFound } from './errors/resource-not-found'

let devicesRepository: InMemoryDevicesRepository
let inventoryRepository: InMemoryInventoryRepository
let sut: RegisterItemInInventoryUseCase

describe('Register item in inventory', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    inventoryRepository = new InMemoryInventoryRepository()
    sut = new RegisterItemInInventoryUseCase(inventoryRepository, devicesRepository)
  })

  it('should be able to register item in inventory', async () => {
    const createdDevice = await devicesRepository.create({
      name: 'OKI 4172',
      status: 'ok',
      type: 'printer',
      acquisition_type: 'bought',
      description: 'Impressora localizado no PCP',
    })

    await sut.execute({
      device_id: createdDevice.id,
      title: 'Tinta Preta',
      location: 'almoxarifado',
      quantity: 1,
      description: null,
    })

    expect(inventoryRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'Tinta Preta',
        location: 'almoxarifado',
        quantity: 1,
        description: null,
      }),
    )
  })

  it('should not be able to register item in inventory with invalid device ID', async () => {
    await expect(() =>
      sut.execute({
        device_id: 'non-existent-device',
        title: 'Tinta Preta',
        location: 'almoxarifado',
        quantity: 1,
        description: null,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
