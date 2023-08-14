import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { RegisterItemInInventoryUseCase } from './register-item'
import { ResourceNotFound } from '../errors/resource-not-found'

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
    const { item } = await sut.execute({
      device_id: null,
      title: 'dell keyboard',
      location: 'it storage',
      quantity: 1,
      description: null,
    })

    expect(item).toEqual(
      expect.objectContaining({
        title: 'dell keyboard',
        location: 'it storage',
        quantity: 1,
        description: null,
      }),
    )
  })

  it('should not be able to register item in inventory with invalid device ID', async () => {
    await expect(() =>
      sut.execute({
        device_id: 'non-existent-device',
        title: 'printer black ink',
        location: 'storage',
        quantity: 1,
        description: null,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
