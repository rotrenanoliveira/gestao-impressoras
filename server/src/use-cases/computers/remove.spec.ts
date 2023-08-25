import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveComputerUseCase } from './remove'
import { InMemoryComputersRepository } from '@/repositories/in-memory/in-memory-computers-repository'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'

let devicesRepository: InMemoryDevicesRepository
let computersRepository: InMemoryComputersRepository
let sut: RemoveComputerUseCase

describe('Remove computer use case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    computersRepository = new InMemoryComputersRepository()
    sut = new RemoveComputerUseCase(devicesRepository, computersRepository)
  })

  it('should be able to remove computer', async () => {
    const { id: deviceId } = await devicesRepository.create({
      name: 'notebook',
      department: 'IT',
    })

    const { id: computerId } = await computersRepository.create({
      deviceId: deviceId,
      usedBy: 'John Doe',
      specs: {} as ComputerSpecs,
    })

    await sut.execute(computerId)

    expect(devicesRepository.items).toHaveLength(0)
    expect(computersRepository.items).toHaveLength(0)
  })
})
