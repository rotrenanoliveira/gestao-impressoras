import { beforeEach, describe, expect, it } from 'vitest'
import { SavePrinterInkUseCase } from './save'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

let printerInkStockRepository: InMemoryPrinterInkStockRepository
let sut: SavePrinterInkUseCase

describe('Save printer ink use case', () => {
  beforeEach(() => {
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    sut = new SavePrinterInkUseCase(printerInkStockRepository)
  })

  it('should be able to save printer ink', async () => {
    const printerInk = await printerInkStockRepository.create({
      name: 'tinta preta',
      quantity: 2,
      printerId: 'printer-id',
    })

    const { ink } = await sut.execute(printerInk.id, {
      name: 'black ink',
    })

    expect(ink).toEqual(
      expect.objectContaining({
        id: printerInk.id,
        quantity: 2,
        name: 'black ink',
      }),
    )
  })

  it('should not be able to save printer ink with wrong id', async () => {
    await expect(() => sut.execute('non-existent-ink', { name: 'w/e' })).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
