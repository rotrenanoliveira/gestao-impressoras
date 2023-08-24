import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyPrinterInkStockUseCase } from './fetch-many'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'

let printerInkStockRepository: InMemoryPrinterInkStockRepository
let sut: FetchManyPrinterInkStockUseCase

describe('Fetch many printer ink stock use case', () => {
  beforeEach(() => {
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    sut = new FetchManyPrinterInkStockUseCase(printerInkStockRepository)
  })

  it('should be able to fetch many printer ink stock', async () => {
    for (let i = 0; i < 5; i++) {
      await printerInkStockRepository.create({
        name: `${i} ink`,
        quantity: i,
        printerId: 'printer-id',
      })
    }

    const { inkStock } = await sut.execute()

    expect(inkStock).toHaveLength(5)
  })
})
