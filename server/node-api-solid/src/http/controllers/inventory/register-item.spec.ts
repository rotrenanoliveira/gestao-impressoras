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
      title: 'teclado dell',
      quantity: 1,
      location: 'ti',
      device_id: null,
      description: null,
    })

    expect(registerItemResponse.status).toEqual(201)
  })

  it('should be able to register item in inventory for a device', async () => {
    const registerDeviceResponse = await request(app.server).post('/devices').send({
      name: 'OKI 4172',
      status: 'ok',
      type: 'printer',
      acquisition_type: 'bought',
      description: 'Impressora localizado no PCP',
    })

    const { device } = registerDeviceResponse.body

    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'teclado dell',
      quantity: 1,
      location: 'ti',
      device_id: device.id,
      description: null,
    })

    expect(registerItemResponse.status).toEqual(201)
  })
})
