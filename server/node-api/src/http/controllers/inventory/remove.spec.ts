import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Remove inventory item (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove inventory item', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'dell keyboard',
      location: 'it storage',
      quantity: 1,
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    const removeInventoryItemResponse = await request(app.server).delete(`/inventory/${item.id}`).send()

    expect(removeInventoryItemResponse.status).toEqual(204)
  })
})
