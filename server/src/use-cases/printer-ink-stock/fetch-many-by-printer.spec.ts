import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyPrinterInkStockByPrinterUseCase } from './fetch-many-by-printer'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'

let printerInkStockRepository: InMemoryPrinterInkStockRepository
let sut: FetchManyPrinterInkStockByPrinterUseCase

describe('Fetch many printer ink stock by printer use case', () => {
  beforeEach(() => {
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    sut = new FetchManyPrinterInkStockByPrinterUseCase(printerInkStockRepository)
  })

  it('should be able to fetch many printer ink stock', async () => {
    for (let i = 0; i < 3; i++) {
      await printerInkStockRepository.create({
        name: `${i} ink`,
        quantity: i,
        printerId: 'printer-id',
      })
    }

    for (let i = 0; i < 5; i++) {
      await printerInkStockRepository.create({
        name: `${i} ink`,
        quantity: i,
        printerId: 'another-printer',
      })
    }

    const { inkStock } = await sut.execute('printer-id')

    expect(inkStock).toHaveLength(3)
  })
})
