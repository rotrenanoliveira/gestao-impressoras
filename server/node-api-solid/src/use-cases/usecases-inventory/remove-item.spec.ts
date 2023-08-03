import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { RemoveInventoryItemUseCase } from './remove-item'
import { ResourceNotFound } from '../errors/resource-not-found'

let inventoryRepository: InMemoryInventoryRepository
let sut: RemoveInventoryItemUseCase

describe('Remove inventory item', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    sut = new RemoveInventoryItemUseCase(inventoryRepository)
  })

  it('should be able to remove item in inventory', async () => {
    const itemRegistered = await inventoryRepository.create({
      title: `item-title`,
      description: null,
      deviceId: null,
      location: 'ti',
      quantity: 1,
    })

    await sut.execute(itemRegistered.id)

    expect(inventoryRepository.items).toHaveLength(0)
  })

  it('should not be able to remove item in inventory with wrong id', async () => {
    await expect(() => sut.execute('non-existent-item')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
