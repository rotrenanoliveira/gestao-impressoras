import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryDevicesRepository } from '@/repositories/in-memory/in-memory-devices-repository'
import { RegisterDeviceUseCase } from './register-device'

let devicesRepository: InMemoryDevicesRepository
let sut: RegisterDeviceUseCase

describe('Register Device Use Case', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new RegisterDeviceUseCase(devicesRepository)
  })

  it('should be able to register device', async () => {
    const { device } = await sut.execute({
      name: 'OKI 4172',
      status: 'ok',
      type: 'printer',
      acquisition_type: 'bought',
      description: 'Impressora localizado no PCP',
    })

    expect(device.id).toEqual(expect.any(String))
    expect(device.created_at).toEqual(expect.any(Date))
    expect(device).toEqual(
      expect.objectContaining({
        name: 'OKI 4172',
        status: 'ok',
        type: 'printer',
        acquisition_type: 'bought',
        description: 'Impressora localizado no PCP',
      }),
    )
  })
})
