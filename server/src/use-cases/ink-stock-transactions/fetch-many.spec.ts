import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyInkStockTransactionsUseCase } from './fetch-many'
import { InMemoryInkStockTransactionsRepository } from '@/repositories/in-memory/in-memory-ink-stock-transactions-repository'

let inkStockTransactionsRepository: InMemoryInkStockTransactionsRepository
let sut: FetchManyInkStockTransactionsUseCase

describe('Fetch many ink stock transactions use case', () => {
  beforeEach(() => {
    inkStockTransactionsRepository = new InMemoryInkStockTransactionsRepository()
    sut = new FetchManyInkStockTransactionsUseCase(inkStockTransactionsRepository)
  })

  it('should be able to fetch many ink stock transactions', async () => {
    for (let i = 0; i < 5; i++) {
      await inkStockTransactionsRepository.create({
        inkId: 'ink-id',
        operator: 'john doe',
        type: 'insert',
      })
    }

    const { transactions } = await sut.execute()

    expect(transactions).toHaveLength(5)
  })
})
