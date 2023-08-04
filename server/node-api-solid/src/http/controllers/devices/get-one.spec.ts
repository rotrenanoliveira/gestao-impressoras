import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch device by id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get device by id', async () => {
    const registerDeviceResponse = await request(app.server).post('/devices').send({
      name: 'Konica Bizhub C284',
      type: 'printer',
      acquisition_type: 'bought',
      status: 'ok',
      supplier: 'OEF',
      contract_expiration: null,
      description: null,
      rented_in: null,
      obs: null,
    })

    const { device } = registerDeviceResponse.body

    const getDeviceResponse = await request(app.server).get(`/devices/${device.id}`).send()

    expect(getDeviceResponse.status).toEqual(200)
    expect(getDeviceResponse.body.device).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        status: 'OK',
        type: 'printer',
        supplier: 'OEF',
        name: 'Konica Bizhub C284',
        acquisition_type: 'BOUGHT',
      }),
    )
  })
})
