import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch all inventory transactions (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all inventory transactions', async () => {
    let itemResponse = await request(app.server).post('/inventory').send({
      title: 'item-title',
      quantity: 10,
      location: 'storage',
      device_id: null,
      description: null,
    })

    let { item } = itemResponse.body

    for (let i = 0; i < 5; i++) {
      await request(app.server).post(`/inventory/${item.id}/transactions`).send({
        quantity: 1,
        operator: 'operator-name',
        transaction_type: 'remove',
      })
    }

    itemResponse = await request(app.server).post('/inventory').send({
      title: 'item-title',
      quantity: 10,
      location: 'storage',
      device_id: null,
      description: null,
    })

    item = itemResponse.body.item

    for (let i = 0; i < 5; i++) {
      await request(app.server).post(`/inventory/${item.id}/transactions`).send({
        quantity: 1,
        operator: 'operator-name',
        transaction_type: 'remove',
      })
    }

    const fetchInventoryTransactionsItemResponse = await request(app.server).get('/inventory/transactions').send()

    expect(fetchInventoryTransactionsItemResponse.status).toEqual(200)
    expect(fetchInventoryTransactionsItemResponse.body.transactions).toHaveLength(10)
  })

  it('should be able to fetch all inventory transactions by item', async () => {
    let itemResponse = await request(app.server).post('/inventory').send({
      title: 'item-title',
      quantity: 10,
      location: 'storage',
      device_id: null,
      description: null,
    })

    let { item } = itemResponse.body

    for (let i = 0; i < 5; i++) {
      await request(app.server).post(`/inventory/${item.id}/transactions`).send({
        quantity: 1,
        operator: 'operator-name',
        transaction_type: 'remove',
      })
    }

    itemResponse = await request(app.server).post('/inventory').send({
      title: 'item-title',
      quantity: 10,
      location: 'storage',
      device_id: null,
      description: null,
    })

    item = itemResponse.body.item

    for (let i = 0; i < 5; i++) {
      await request(app.server).post(`/inventory/${item.id}/transactions`).send({
        quantity: 1,
        operator: 'operator-name',
        transaction_type: 'remove',
      })
    }

    const fetchInventoryTransactionsItemResponse = await request(app.server)
      .get(`/inventory/transactions?itemId=${item.id}`)
      .send()

    expect(fetchInventoryTransactionsItemResponse.status).toEqual(200)
    expect(fetchInventoryTransactionsItemResponse.body.transactions).toHaveLength(5)
  })
})
