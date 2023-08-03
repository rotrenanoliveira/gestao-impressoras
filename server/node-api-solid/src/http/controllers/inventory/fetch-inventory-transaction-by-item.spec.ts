import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch inventory transaction by item (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch inventory transaction by item', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'Teclado dell',
      quantity: 10,
      location: 'ti',
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    await request(app.server).post(`/inventory/${item.id}/transactions`).send({
      operator: 'operator-name',
      quantity: 1,
      transaction_type: 'remove',
    })

    await request(app.server).post(`/inventory/${item.id}/transactions`).send({
      operator: 'operator-name',
      quantity: 2,
      transaction_type: 'insert',
    })

    const inventoryTransactionsResponse = await request(app.server).get(`/inventory/${item.id}/transactions`).send()

    expect(inventoryTransactionsResponse.status).toEqual(200)
    expect(inventoryTransactionsResponse.body.transactions).toHaveLength(2)
  })
})
