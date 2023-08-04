import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { GetInventoryItemByIdUseCase } from './get-by-id'

let inventoryRepository: InMemoryInventoryRepository
let sut: GetInventoryItemByIdUseCase

describe('Get inventory item by id', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    sut = new GetInventoryItemByIdUseCase(inventoryRepository)
  })

  it('should be able to get item in inventory', async () => {
    const itemRegistered = await inventoryRepository.create({
      title: `item-title`,
      description: null,
      deviceId: null,
      location: 'it storage',
      quantity: 1,
    })

    const { item } = await sut.execute(itemRegistered.id)

    expect(item.id).toEqual(itemRegistered.id)

    expect(item).toEqual(
      expect.objectContaining({
        title: `item-title`,
        description: null,
        deviceId: null,
        location: 'it storage',
        quantity: 1,
      }),
    )
  })
})
