import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPrinterUseCase } from './register'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { InMemoryPrintersRepository } from '@/repositories/in-memory/in-memory-printer-repository'

let devicesRepository: InMemoryDevicesRepository
let printersRepository: InMemoryPrintersRepository
let sut: RegisterPrinterUseCase

describe('Register printer Use Case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    printersRepository = new InMemoryPrintersRepository()
    sut = new RegisterPrinterUseCase(devicesRepository, printersRepository)
  })

  it('should be able to register printer device', async () => {
    const { printer } = await sut.execute({
      name: 'OKI 4172',
      department: 'IT',
      ip: '0.0.0.1',
      rentedIn: new Date('2020, 10, 28'),
      expiresAt: new Date('2023, 10, 28'),
      obs: null,
    })

    expect(devicesRepository.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        status: 'ok',
        name: 'OKI 4172',
        department: 'IT',
      }),
    )

    expect(printer).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ip: '0.0.0.1',
        rentedIn: new Date('2020, 10, 28'),
        expiresAt: new Date('2023, 10, 28'),
        obs: null,
      }),
    )
  })
})
