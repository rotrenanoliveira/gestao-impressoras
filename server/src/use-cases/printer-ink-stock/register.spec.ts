import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPrinterInkUseCase } from './register'
import { InMemoryPrintersRepository } from '@/repositories/in-memory/in-memory-printer-repository'
import { InMemoryPrinterInkStockRepository } from '@/repositories/in-memory/in-memory-printer-ink-stock-repository'

let printerInkStockRepository: InMemoryPrinterInkStockRepository
let printersRepository: InMemoryPrintersRepository
let sut: RegisterPrinterInkUseCase

describe('Register printer ink use case', () => {
  beforeEach(() => {
    printerInkStockRepository = new InMemoryPrinterInkStockRepository()
    printersRepository = new InMemoryPrintersRepository()
    sut = new RegisterPrinterInkUseCase(printerInkStockRepository, printersRepository)
  })

  it('should be able to register printer ink', async () => {
    const { id: printerId } = await printersRepository.create({
      deviceId: 'device-id',
      ip: '0.0.0.1',
      rentedIn: new Date('2020, 10, 28'),
      expiresAt: new Date('2023, 10, 28'),
      obs: null,
    })

    const { ink } = await sut.execute({
      name: 'black ink',
      quantity: 1,
      printerId,
    })

    expect(ink).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'black ink',
        quantity: 1,
        printer: expect.objectContaining({
          id: printerId,
          name: expect.any(String),
        }),
      }),
    )
  })
})
