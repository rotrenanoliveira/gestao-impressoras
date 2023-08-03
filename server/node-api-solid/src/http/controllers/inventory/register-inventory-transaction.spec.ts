import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register inventory transaction (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register inventory transaction', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'Teclado dell',
      quantity: 10,
      location: 'ti',
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    const registerInventoryTransaction = await request(app.server).post(`/inventory/${item.id}/transactions`).send({
      operator: 'operator-name',
      quantity: 1,
      transaction_type: 'remove',
    })

    expect(registerInventoryTransaction.status).toEqual(201)
  })
})
