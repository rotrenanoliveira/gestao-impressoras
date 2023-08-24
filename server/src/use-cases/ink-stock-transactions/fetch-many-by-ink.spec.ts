import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyInkStockTransactionsByInkUseCase } from './fetch-many-by-ink'
import { InMemoryInkStockTransactionsRepository } from '@/repositories/in-memory/in-memory-ink-stock-transactions-repository'

let inkStockTransactionsRepository: InMemoryInkStockTransactionsRepository
let sut: FetchManyInkStockTransactionsByInkUseCase

describe('Fetch many ink stock transactions by ink use case', () => {
  beforeEach(() => {
    inkStockTransactionsRepository = new InMemoryInkStockTransactionsRepository()
    sut = new FetchManyInkStockTransactionsByInkUseCase(inkStockTransactionsRepository)
  })

  it('should be able to fetch many ink stock transactions', async () => {
    for (let i = 0; i < 3; i++) {
      await inkStockTransactionsRepository.create({
        inkId: 'ink-id',
        operator: 'john doe',
        type: 'insert',
      })
    }

    for (let i = 0; i < 5; i++) {
      await inkStockTransactionsRepository.create({
        inkId: 'another-ink',
        operator: 'john doe',
        type: 'insert',
      })
    }

    const { transactions } = await sut.execute('ink-id')

    expect(transactions).toHaveLength(3)
  })
})
