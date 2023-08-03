import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyDevicesByTypeUseCase } from './fetch-many-by-type'

let devicesRepository: InMemoryDevicesRepository
let sut: FetchManyDevicesByTypeUseCase

describe('Fetch all devices', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new FetchManyDevicesByTypeUseCase(devicesRepository)
  })

  it('should be able to fetch many devices by type', async () => {
    for (let i = 0; i < 5; i++) {
      devicesRepository.create({
        name: `device-${i}`,
        status: 'OK',
        type: 'printer',
        supplier: 'supplier-name',
        acquisition_type: 'BOUGHT',
        contract_expiration: null,
        description: null,
        rented_in: null,
        obs: null,
      })
    }

    const { devices } = await sut.execute('printer')

    expect(devices).toHaveLength(5)
  })
})
