import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch inventory item by id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get inventory item by id', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'dell keyboard',
      quantity: 1,
      location: 'it storage',
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    const getInventoryItemResponse = await request(app.server).get(`/inventory/${item.id}`).send()

    expect(getInventoryItemResponse.status).toEqual(200)
    expect(getInventoryItemResponse.body.item).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'dell keyboard',
        location: 'it storage',
        quantity: 1,
        device_id: null,
        description: null,
      }),
    )
  })
})
