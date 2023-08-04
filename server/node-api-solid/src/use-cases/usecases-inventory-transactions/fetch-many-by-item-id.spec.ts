import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryInventoryTransactionsRepository } from '@/repositories/in-memory/in-memory-inventory-transactions-repository'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { FetchManyInventoryTransactionsByItemUseCase } from './fetch-many-by-item-id'

let inventoryRepository: InMemoryInventoryRepository
let inventoryTransactionsRepository: InMemoryInventoryTransactionsRepository
let sut: FetchManyInventoryTransactionsByItemUseCase

describe('Fetch inventory transactions by item id', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    inventoryTransactionsRepository = new InMemoryInventoryTransactionsRepository()
    sut = new FetchManyInventoryTransactionsByItemUseCase(inventoryTransactionsRepository)
  })

  it('should be able to fetch the list of transactions of item', async () => {
    await inventoryRepository.create({
      id: 'item-id',
      deviceId: 'device-id',
      title: 'printer ink',
      quantity: 1,
      location: 'storage',
      description: null,
    })

    for (let i = 1; i <= 5; i++) {
      await inventoryTransactionsRepository.create({
        itemId: 'item-id',
        operator: 'operator-name',
        quantity: 1,
        transaction_type: 'INSERT',
      })
    }

    const { transactions } = await sut.execute({ itemId: 'item-id' })

    expect(transactions).toHaveLength(5)
  })
})
