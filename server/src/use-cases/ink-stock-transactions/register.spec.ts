import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterInkStockTransactionUseCase } from './register'
import { InMemoryInkStockTransactionsRepository } from '@/repositories/in-memory/in-memory-ink-stock-transactions-repository'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'

let inkStockTransactionsRepository: InMemoryInkStockTransactionsRepository
let printerInkStockRepository: InMemoryPrinterInkStockRepository
let sut: RegisterInkStockTransactionUseCase

describe('Register ink stock transaction use case', () => {
  beforeEach(() => {
    inkStockTransactionsRepository = new InMemoryInkStockTransactionsRepository()
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    sut = new RegisterInkStockTransactionUseCase(inkStockTransactionsRepository, printerInkStockRepository)
  })

  it('should be able to register a insert transaction', async () => {
    const { id: inkId } = await printerInkStockRepository.create({
      name: 'black ink',
      quantity: 2,
      printerId: 'printer-id',
    })

    const { transaction } = await sut.execute({
      inkId,
      operator: 'john doe',
      transaction: 'insert',
    })

    expect(transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        operator: 'john doe',
        type: 'insert',
        createdAt: expect.any(Date),
        ink: expect.objectContaining({
          id: inkId,
          name: expect.any(String),
        }),
      }),
    )

    expect(printerInkStockRepository.items[0]).toEqual(
      expect.objectContaining({
        id: inkId,
        quantity: 3,
      }),
    )
  })

  it('should be able to register a remove transaction', async () => {
    const { id: inkId } = await printerInkStockRepository.create({
      name: 'blue ink',
      quantity: 2,
      printerId: 'printer-id',
    })

    const { transaction } = await sut.execute({
      inkId,
      operator: 'john doe',
      transaction: 'remove',
    })

    expect(transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        operator: 'john doe',
        type: 'remove',
        createdAt: expect.any(Date),
        ink: expect.objectContaining({
          id: inkId,
          name: expect.any(String),
        }),
      }),
    )

    expect(printerInkStockRepository.items[0]).toEqual(
      expect.objectContaining({
        id: inkId,
        quantity: 1,
      }),
    )
  })
})
