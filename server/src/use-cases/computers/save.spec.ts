import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryComputersRepository } from '@/repositories/in-memory/in-memory-computers-repository'
import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { SaveComputerUseCase } from './save'

let devicesRepository: InMemoryDevicesRepository
let computersRepository: InMemoryComputersRepository
let sut: SaveComputerUseCase

describe('Save computer use case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    computersRepository = new InMemoryComputersRepository()
    sut = new SaveComputerUseCase(devicesRepository, computersRepository)
  })

  it('should be able to save computer', async () => {
    const device = await devicesRepository.create({
      name: 'LG Monitor',
      department: 'IT',
    })

    const { id: computerId } = await computersRepository.create({
      deviceId: device.id,
      usedBy: 'John Doe',
      specs: {} as ComputerSpecs,
    })

    const { computer } = await sut.execute(computerId, {
      name: 'Dell XPS',
      status: 'warning',
      usedBy: 'Vincent',
      specs: {
        so: 'Windows 11',
      } as ComputerSpecs,
    })

    expect(computer).toEqual(
      expect.objectContaining({
        id: computer.id,
        deviceId: computer.deviceId,
        usedBy: 'Vincent',
        specs: { so: 'Windows 11' },
      }),
    )

    expect(devicesRepository.items[0]).toEqual(
      expect.objectContaining({
        id: device.id,
        status: 'warning',
        name: 'Dell XPS',
      }),
    )
  })
})
