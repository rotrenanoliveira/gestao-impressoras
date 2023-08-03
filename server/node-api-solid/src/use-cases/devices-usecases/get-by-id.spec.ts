import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetDeviceByIdUseCase } from './get-by-id'
import { ResourceNotFound } from '../errors/resource-not-found'

let devicesRepository: InMemoryDevicesRepository
let sut: GetDeviceByIdUseCase

describe('Get device by id', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new GetDeviceByIdUseCase(devicesRepository)
  })

  it('should be able to get device by id', async () => {
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

    const { device } = await sut.execute(deviceRegistered.id)

    expect(device.id).toEqual(deviceRegistered.id)
    expect.objectContaining({
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
  })

  it('should not be able to get device by id', async () => {
    await expect(() => sut.execute('non-existent-device')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
