import { beforeEach, describe, expect, it } from 'vitest'
import { FetchAllInventoryItemsUseCase } from './fetch-all'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'

let inventoryRepository: InMemoryInventoryRepository
let sut: FetchAllInventoryItemsUseCase

describe('Fetch All items in inventory', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    sut = new FetchAllInventoryItemsUseCase(inventoryRepository)
  })

  it('should be able to fetch all item in inventory', async () => {
    for (let i = 0; i < 5; i++) {
      await inventoryRepository.create({
        title: `item-${i}`,
        description: null,
        deviceId: null,
        location: 'ti',
        quantity: 1,
      })
    }

    const { items } = await sut.execute()

    expect(items).toHaveLength(5)
  })
})
