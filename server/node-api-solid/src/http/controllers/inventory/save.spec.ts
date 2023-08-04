import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Save inventory item (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to save inventory item', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'dell keyboard',
      quantity: 1,
      location: 'it storage',
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    const saveDeviceResponse = await request(app.server).put(`/inventory/${item.id}`).send({
      device_id: null,
      title: 'LG monitor',
      location: 'it storage',
      description: 'LG monitor 19"',
    })

    expect(saveDeviceResponse.status).toEqual(200)
    expect(saveDeviceResponse.body.item).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'LG monitor',
        location: 'it storage',
        quantity: 1,
        device_id: null,
        description: 'LG monitor 19"',
      }),
    )
  })
})
