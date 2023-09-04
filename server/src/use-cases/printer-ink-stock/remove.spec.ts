import { beforeEach, describe, expect, it } from 'vitest'
import { RemovePrinterInkUseCase } from './remove'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

let printerInkStockRepository: InMemoryPrinterInkStockRepository
let sut: RemovePrinterInkUseCase

describe('Remove printer ink use case', () => {
  beforeEach(() => {
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    sut = new RemovePrinterInkUseCase(printerInkStockRepository)
  })

  it('should be able to remove printer ink', async () => {
    const { id: inkId } = await printerInkStockRepository.create({
      name: 'tinta preta',
      quantity: 2,
      printerId: 'printer-id',
    })

    await sut.execute(inkId)

    expect(printerInkStockRepository.items).toHaveLength(0)
  })

  it('should not be able to remove printer ink with wrong id', async () => {
    await expect(() => sut.execute('non-existent-ink')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
