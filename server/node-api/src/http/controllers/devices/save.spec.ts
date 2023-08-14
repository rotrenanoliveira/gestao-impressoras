import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Save device (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to save device', async () => {
    const registerDeviceResponse = await request(app.server).post('/devices').send({
      name: 'Konica Bizhub C284',
      type: 'printer',
      acquisition_type: 'rented',
      status: 'ok',
      supplier: 'OEF',
      contract_expiration: null,
      description: null,
      rented_in: null,
      obs: null,
    })

    const { device } = registerDeviceResponse.body

    const saveDeviceResponse = await request(app.server).put(`/devices/${device.id}`).send({
      type: 'pc',
      supplier: 'Dell',
      status: 'warning',
      acquisition_type: 'bought',
      name: 'Dell Desktop Vostro',
    })

    expect(saveDeviceResponse.status).toEqual(200)
    expect(saveDeviceResponse.body.device).toEqual(
      expect.objectContaining({
        type: 'pc',
        supplier: 'Dell',
        status: 'WARNING',
        name: 'Dell Desktop Vostro',
        acquisition_type: 'BOUGHT',
        contract_expiration: null,
        description: null,
        rented_in: null,
        obs: null,
      }),
    )
  })
})
