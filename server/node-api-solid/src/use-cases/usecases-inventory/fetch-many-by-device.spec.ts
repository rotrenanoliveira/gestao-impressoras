import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { FetchManyInventoryItemsByDeviceUseCase } from './fetch-many-by-device'

let inventoryRepository: InMemoryInventoryRepository
let devicesRepository: InMemoryDevicesRepository
let sut: FetchManyInventoryItemsByDeviceUseCase

describe('Fetch many items by device', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    devicesRepository = new InMemoryDevicesRepository()
    sut = new FetchManyInventoryItemsByDeviceUseCase(inventoryRepository)
  })

  it('should be able to fetch many items by device', async () => {
    const device = await devicesRepository.create({
      name: 'OKI 4172',
      status: 'OK',
      type: 'printer',
      supplier: 'OEF',
      acquisition_type: 'BOUGHT',
      description: 'Impressora localizado no PCP',
      contract_expiration: null,
      rented_in: null,
      obs: null,
    })

    for (let i = 0; i < 5; i++) {
      await inventoryRepository.create({
        title: `item-${i}`,
        description: null,
        deviceId: device.id,
        location: 'ti',
        quantity: 1,
      })
    }

    const { items } = await sut.execute(device.id)

    expect(items).toHaveLength(5)
  })
})
