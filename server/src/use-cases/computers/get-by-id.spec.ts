import { beforeEach, describe, expect, it } from 'vitest'
import { GetComputerByIdUseCase } from './get-by-id'
import { InMemoryComputersRepository } from '@/repositories/in-memory/in-memory-computers-repository'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

let devicesRepository: InMemoryDevicesRepository
let computersRepository: InMemoryComputersRepository
let sut: GetComputerByIdUseCase

describe('Get computer by ID use case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    computersRepository = new InMemoryComputersRepository()
    sut = new GetComputerByIdUseCase(computersRepository)
  })

  it('should be able to get computer by ID', async () => {
    const device = await devicesRepository.create({
      name: `Tablet Samsung`,
      department: 'IT',
    })

    const { id: computerId } = await computersRepository.create({
      deviceId: device.id,
      usedBy: 'John Doe',
      specs: {} as ComputerSpecs,
    })

    const { computer } = await sut.execute(computerId)

    expect(computer).toEqual(
      expect.objectContaining({
        id: computerId,
        deviceId: device.id,
        usedBy: 'John Doe',
      }),
    )
  })

  it('should not be able to get computer with wrong ID', async () => {
    await expect(() => sut.execute('non-existent-computer')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
