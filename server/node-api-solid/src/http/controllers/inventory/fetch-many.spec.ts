import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch all inventory items (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all inventory items', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/inventory')
        .send({
          title: `item-${i}`,
          quantity: 1,
          location: 'storage',
          device_id: null,
          description: null,
        })
    }

    const fetchInventoryItemResponse = await request(app.server).get('/inventory').send()

    expect(fetchInventoryItemResponse.status).toEqual(200)
    expect(fetchInventoryItemResponse.body.items).toHaveLength(5)
  })

  it('should be able to fetch all devices by type', async () => {
    const registerDeviceResponse = await request(app.server).post('/devices').send({
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

    const { device } = registerDeviceResponse.body

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/inventory')
        .send({
          title: `item-${i}`,
          quantity: 1,
          location: 'storage',
          device_id: device.id,
          description: null,
        })
    }

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/inventory')
        .send({
          title: `item-${i}`,
          quantity: 1,
          location: 'storage',
          device_id: null,
          description: null,
        })
    }

    const fetchInventoryItemResponse = await request(app.server).get(`/inventory?deviceId=${device.id}`).send()

    expect(fetchInventoryItemResponse.status).toEqual(200)
    expect(fetchInventoryItemResponse.body.items).toHaveLength(5)
  })
})
