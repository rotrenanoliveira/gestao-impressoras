import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryInventoryTransactionsRepository } from '@/repositories/in-memory/in-memory-inventory-transactions-repository'
import { FetchInventoryTransactionsByDeviceUseCase } from './fetch-inventory-transactions-by-device'

let inventoryTransactionsRepository: InMemoryInventoryTransactionsRepository
let sut: FetchInventoryTransactionsByDeviceUseCase

describe('Fetch inventory transactions by device id', () => {
  beforeEach(() => {
    inventoryTransactionsRepository = new InMemoryInventoryTransactionsRepository()
    sut = new FetchInventoryTransactionsByDeviceUseCase(inventoryTransactionsRepository)
  })

  it('should be able to fetch the list of transactions of device', async () => {
    const { transactions } = await sut.execute({ device_id: 'device-id' })

    expect(transactions).toHaveLength(0)
  })
})
