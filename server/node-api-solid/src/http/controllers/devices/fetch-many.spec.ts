import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch many device (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all devices', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app.server).post('/devices').send({
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
    }

    const fetchDevicesResponse = await request(app.server).get('/devices').send()

    expect(fetchDevicesResponse.status).toEqual(200)
    expect(fetchDevicesResponse.body.devices).toHaveLength(5)
  })

  it('should be able to fetch all devices by type', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app.server).post('/devices').send({
        name: 'Vostro Small Desktop',
        type: 'pc',
        acquisition_type: 'bought',
        status: 'ok',
        supplier: 'OEF',
        contract_expiration: null,
        description: null,
        rented_in: null,
        obs: null,
      })
    }

    for (let i = 0; i < 5; i++) {
      await request(app.server).post('/devices').send({
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
    }

    const fetchDevicesResponse = await request(app.server).get('/devices?type=pc').send()

    expect(fetchDevicesResponse.status).toEqual(200)
    expect(fetchDevicesResponse.body.devices).toHaveLength(5)
  })
})
