import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyComputersUseCase } from './fetch-many'
import { InMemoryComputersRepository } from '@/repositories/in-memory/in-memory-computers-repository'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'

let devicesRepository: InMemoryDevicesRepository
let computersRepository: InMemoryComputersRepository
let sut: FetchManyComputersUseCase

describe('Fetch many computers use case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    computersRepository = new InMemoryComputersRepository()
    sut = new FetchManyComputersUseCase(computersRepository)
  })

  it('should be able to fetch many computers', async () => {
    for (let i = 0; i < 5; i++) {
      const device = await devicesRepository.create({
        name: `device-${i}`,
        department: 'IT',
      })

      await computersRepository.create({
        deviceId: device.id,
        usedBy: 'John Doe',
        specs: {} as ComputerSpecs,
      })
    }

    const { computers } = await sut.execute()

    expect(computers).toHaveLength(5)
  })
})
