import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register item in inventory (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register item in inventory', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'dell keyboard',
      quantity: 1,
      location: 'it storage',
      device_id: null,
      description: null,
    })

    expect(registerItemResponse.status).toEqual(201)
  })

  it('should be able to register item in inventory for a device', async () => {
    const registerDeviceResponse = await request(app.server)
      .post('/devices')
      .send({
        status: 'ok',
        supplier: 'OEF',
        type: 'printer',
        name: 'OKI 4172',
        acquisition_type: 'rented',
        contract_expiration: new Date('2023, 11, 01'),
        rented_in: new Date('2020, 11, 01'),
        description: null,
        obs: null,
      })

    const { device } = registerDeviceResponse.body

    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'black ink',
      quantity: 1,
      location: 'storage',
      device_id: device.id,
      description: null,
    })

    expect(registerItemResponse.status).toEqual(201)
    expect(registerItemResponse.body.item).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'black ink',
        quantity: 1,
        location: 'storage',
        device_id: device.id,
        description: null,
      }),
    )
  })
})
