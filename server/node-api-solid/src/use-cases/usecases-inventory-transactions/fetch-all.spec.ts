import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { InMemoryInventoryTransactionsRepository } from '@/repositories/in-memory/in-memory-inventory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchAllInventoryTransactionsUseCase } from './fetch-all'

let inventoryTransactionsRepository: InMemoryInventoryTransactionsRepository
let inventoryRepository: InMemoryInventoryRepository
let sut: FetchAllInventoryTransactionsUseCase

describe('Fetch all inventory transactions use case', () => {
  beforeEach(() => {
    inventoryTransactionsRepository = new InMemoryInventoryTransactionsRepository()
    inventoryRepository = new InMemoryInventoryRepository()
    sut = new FetchAllInventoryTransactionsUseCase(inventoryTransactionsRepository)
  })

  it('should be able to fetch all inventory transactions', async () => {
    const item = await inventoryRepository.create({
      quantity: 10,
      title: 'keyboard',
      location: 'it storage',
      deviceId: null,
      description: null,
    })

    for (let id = 0; id < 5; id++) {
      await inventoryTransactionsRepository.create({
        quantity: 1,
        itemId: item.id,
        operator: 'operator-name',
        transaction_type: 'REMOVE',
      })
    }

    const { transactions } = await sut.execute()

    expect(transactions).toHaveLength(5)
    expect(transactions[0]).toEqual(
      expect.objectContaining({
        quantity: 1,
        itemId: item.id,
        operator: 'operator-name',
        transaction_type: 'REMOVE',
        item: {
          title: expect.any(String),
        },
      }),
    )
  })
})
