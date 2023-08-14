import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SaveDeviceUseCase } from './save'
import { ResourceNotFound } from '../errors/resource-not-found'

let devicesRepository: InMemoryDevicesRepository
let sut: SaveDeviceUseCase

describe('Save device', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new SaveDeviceUseCase(devicesRepository)
  })

  it('should be able to save device', async () => {
    const deviceRegistered = await devicesRepository.create({
      name: 'device-id',
      status: 'OK',
      type: 'pc',
      supplier: 'supplier-name',
      acquisition_type: 'BOUGHT',
      contract_expiration: null,
      description: null,
      rented_in: null,
      obs: null,
    })

    const { device } = await sut.execute(deviceRegistered.id, {
      type: 'printer',
      acquisition_type: 'RENTED',
      rented_in: new Date('2020, 11, 01'),
      contract_expiration: new Date('2023, 11, 01'),
    })

    expect(device).toEqual(
      expect.objectContaining({
        supplier: 'supplier-name',
        name: 'device-id',
        description: null,
        status: 'OK',
        obs: null,
        type: 'printer',
        acquisition_type: 'RENTED',
        rented_in: new Date('2020, 11, 01'),
        contract_expiration: new Date('2023, 11, 01'),
      }),
    )
  })

  it('should not be able to save device with wrong id', async () => {
    await expect(() => sut.execute('non-existent-device', {})).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
