import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Remove device (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove device', async () => {
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

    const removeDeviceResponse = await request(app.server).delete(`/devices/${device.id}`).send()

    expect(removeDeviceResponse.status).toEqual(204)
  })
})
