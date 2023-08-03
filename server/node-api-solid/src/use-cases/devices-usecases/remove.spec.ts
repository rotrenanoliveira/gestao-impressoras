import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveDeviceUseCase } from './remove'
import { ResourceNotFound } from '../errors/resource-not-found'

let devicesRepository: InMemoryDevicesRepository
let sut: RemoveDeviceUseCase

describe('Remove device', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new RemoveDeviceUseCase(devicesRepository)
  })

  it('should be able to remove a specific device', async () => {
    const deviceRegistered = await devicesRepository.create({
      name: 'device-id',
      status: 'OK',
      type: 'printer',
      supplier: 'supplier-name',
      acquisition_type: 'BOUGHT',
      contract_expiration: null,
      description: null,
      rented_in: null,
      obs: null,
    })

    await sut.execute(deviceRegistered.id)

    expect(devicesRepository.items).toHaveLength(0)
  })

  it('should not be able to remove device with wrong id', async () => {
    await expect(() => sut.execute('non-existent-device')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
