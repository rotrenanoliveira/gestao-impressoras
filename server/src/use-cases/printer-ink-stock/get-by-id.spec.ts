import { beforeEach, describe, expect, it } from 'vitest'
import { GetPrinterInkByIdUseCase } from './get-by-id'
import { ResourceNotFound } from '../errors/resource-not-found'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'

let printerInkStockRepository: InMemoryPrinterInkStockRepository
let sut: GetPrinterInkByIdUseCase

describe('Get printer ink by ID use case', () => {
  beforeEach(() => {
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    sut = new GetPrinterInkByIdUseCase(printerInkStockRepository)
  })

  it('should be able to get printer ink by ID', async () => {
    const { id: inkId } = await printerInkStockRepository.create({
      name: 'black ink',
      quantity: 1,
      printerId: 'printer-id',
    })

    const { ink } = await sut.execute(inkId)

    expect(ink).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'black ink',
        quantity: 1,
        printer: expect.objectContaining({
          id: 'printer-id',
          name: expect.any(String),
        }),
      }),
    )
  })

  it('should not be able to get printer ink with wrong ID', async () => {
    await expect(() => sut.execute('non-existent-printer-ink')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
