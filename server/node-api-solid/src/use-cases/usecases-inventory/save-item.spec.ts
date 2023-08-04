import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { SaveInventoryItemUseCase } from './save-item'
import { InvalidOperationError } from '../errors/invalid-operation'

let inventoryRepository: InMemoryInventoryRepository
let sut: SaveInventoryItemUseCase

describe('Save inventory item', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    sut = new SaveInventoryItemUseCase(inventoryRepository)
  })

  it('should be able to save item in inventory', async () => {
    const itemRegistered = await inventoryRepository.create({
      title: `item-title`,
      description: null,
      deviceId: null,
      location: 'it storage',
      quantity: 1,
    })

    const { item } = await sut.execute(itemRegistered.id, {
      location: 'storage',
      title: 'dell mouse',
    })

    expect(item.id).toEqual(itemRegistered.id)
    expect(item).toEqual(
      expect.objectContaining({
        description: null,
        deviceId: null,
        quantity: 1,
        title: 'dell mouse',
        location: 'storage',
      }),
    )
  })

  it('should not be able to modify inventory item quantity directly', async () => {
    const itemRegistered = await inventoryRepository.create({
      title: `item-title`,
      description: null,
      deviceId: null,
      location: 'it storage',
      quantity: 1,
    })

    await expect(() =>
      sut.execute(itemRegistered.id, {
        quantity: 5,
      }),
    ).rejects.toBeInstanceOf(InvalidOperationError)
  })

  it('should not be able to save item in inventory with wrong id', async () => {
    await expect(() => sut.execute('non-existent-item', {})).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
