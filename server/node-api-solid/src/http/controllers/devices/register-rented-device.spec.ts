import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register rented device (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register rented device', async () => {
    const registerDeviceResponse = await request(app.server).post('/devices').send({
      name: 'OKI 4172',
      status: 'ok',
      type: 'printer',
      acquisition_type: 'bought',
      description: 'Impressora localizado no PCP',
    })

    expect(registerDeviceResponse.status).toEqual(201)
    expect(registerDeviceResponse.body.device).toEqual(
      expect.objectContaining({
        name: 'OKI 4172',
        status: 'OK',
        type: 'printer',
        acquisition_type: 'BOUGHT',
        description: 'Impressora localizado no PCP',
      }),
    )

    const { device }: { device: Device } = registerDeviceResponse.body

    const registerRentedDeviceResponse = await request(app.server)
      .post('/devices/rented')
      .send({
        device_id: device.id,
        supplier: 'OEF',
        rented_in: new Date('2020, 11, 01'),
        contract_expiration: new Date('2023, 11, 01'),
        obs: 'OEF ou NGR impressoras',
      })

    expect(registerRentedDeviceResponse.status).toEqual(201)
  })
})
