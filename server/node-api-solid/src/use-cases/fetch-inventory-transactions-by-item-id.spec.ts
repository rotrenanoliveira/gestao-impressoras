import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryInventoryTransactionsRepository } from '@/repositories/in-memory/in-memory-inventory-transactions-repository'
import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { FetchInventoryTransactionsByItemIdUseCase } from './fetch-inventory-transactions-by-item-id'

let inventoryRepository: InMemoryInventoryRepository
let inventoryTransactionsRepository: InMemoryInventoryTransactionsRepository
let sut: FetchInventoryTransactionsByItemIdUseCase

describe.skip('Fetch inventory transactions by item id', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    inventoryTransactionsRepository = new InMemoryInventoryTransactionsRepository()
    sut = new FetchInventoryTransactionsByItemIdUseCase(inventoryTransactionsRepository)
  })

  it('should be able to fetch the list of transactions of item', async () => {
    await inventoryRepository.create({
      id: 'item-id',
      device_id: 'device-id',
      title: 'tinta',
      quantity: 1,
      location: 'almoxarifado',
      description: null,
    })

    for (let i = 1; i <= 5; i++) {
      await inventoryTransactionsRepository.create({
        item_id: 'item-id',
        operator: 'operator-name',
        quantity: 1,
        transaction_type: 'INSERT',
      })
    }

    const { transactions } = await sut.execute({ item_id: 'item-id' })

    expect(transactions).toHaveLength(5)
  })
})
