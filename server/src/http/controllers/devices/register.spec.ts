import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Register Device (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register device', async () => {
    const registerDeviceResponse = await request(app.server).post('/devices').send({
      name: 'OKI 4172',
      type: 'printer',
      acquisition_type: 'bought',
      status: 'ok',
      supplier: 'OEF',
      contract_expiration: null,
      description: null,
      rented_in: null,
      obs: null,
    })

    expect(registerDeviceResponse.status).toEqual(201)
    expect(registerDeviceResponse.body.device).toEqual(
      expect.objectContaining({
        name: 'OKI 4172',
        type: 'printer',
        acquisition_type: 'BOUGHT',
        status: 'OK',
        supplier: 'OEF',
      }),
    )
  })
})
