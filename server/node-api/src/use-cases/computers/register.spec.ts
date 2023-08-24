import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterComputerUseCase } from './register'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { InMemoryComputersRepository } from '@/repositories/in-memory/in-memory-computers-repository'

let devicesRepository: InMemoryDevicesRepository
let computersRepository: InMemoryComputersRepository
let sut: RegisterComputerUseCase

describe('Register Computer Use Case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    computersRepository = new InMemoryComputersRepository()
    sut = new RegisterComputerUseCase(devicesRepository, computersRepository)
  })

  it('should be able to register computer device', async () => {
    const { computer } = await sut.execute({
      name: 'Dell XPS',
      department: 'IT',
      usedBy: 'IT Manager',
      specs: {
        ram: '16GB',
        so: 'Windows 11',
        office: 'Microsoft 365',
        hostname: 'notebook-dell',
        processor: 'Intel Core i7',
        storage: { type: 'SSD', capacity: 1024 },
      },
    })

    expect(devicesRepository.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        status: 'ok',
        name: 'Dell XPS',
        department: 'IT',
      }),
    )

    expect(computer).toEqual(
      expect.objectContaining({
        usedBy: 'IT Manager',
        id: expect.any(String),
        specs: expect.any(Object),
      }),
    )
  })
})
