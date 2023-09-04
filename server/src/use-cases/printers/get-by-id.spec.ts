import { beforeEach, describe, expect, it } from 'vitest'
import { GetPrinterByIdUseCase } from './get-by-id'
import { ResourceNotFound } from '../errors/resource-not-found'
import { InMemoryPrintersRepository } from '@/repositories/in-memory/in-memory-printer-repository'

let printersRepository: InMemoryPrintersRepository
let sut: GetPrinterByIdUseCase

describe('Get printer by ID use case', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    sut = new GetPrinterByIdUseCase(printersRepository)
  })

  it('should be able to get printer by ID', async () => {
    const { id: printerId } = await printersRepository.create({
      deviceId: 'device-id',
      ip: '0.0.0.1',
      rentedIn: new Date('2020, 10, 28'),
      expiresAt: new Date('2023, 10, 28'),
      obs: null,
    })

    const { printer } = await sut.execute(printerId)

    expect(printer).toEqual(
      expect.objectContaining({
        id: printer.id,
        deviceId: 'device-id',
        ip: '0.0.0.1',
        rentedIn: new Date('2020, 10, 28'),
        expiresAt: new Date('2023, 10, 28'),
        obs: null,
      }),
    )
  })

  it('should not be able to get printer with wrong ID', async () => {
    await expect(() => sut.execute('non-existent-printer')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
