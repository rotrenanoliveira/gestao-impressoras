import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Register inventory transaction (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register inventory transaction (consume)', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'dell keyboard',
      location: 'it storage',
      quantity: 10,
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    const registerInventoryTransaction = await request(app.server).post(`/inventory/${item.id}/transactions`).send({
      quantity: 1,
      operator: 'operator-name',
      transaction_type: 'remove',
    })

    const transactions = await prisma.inventoryTransaction.findFirst()
    const inventory = await prisma.inventory.findFirst()

    expect(registerInventoryTransaction.status).toEqual(201)
    expect(transactions?.quantity).toEqual(1)
    expect(inventory?.quantity).toEqual(9)
  })

  it('should be able to register inventory transaction (insert)', async () => {
    const registerItemResponse = await request(app.server).post('/inventory').send({
      title: 'dell keyboard',
      location: 'it storage',
      quantity: 10,
      device_id: null,
      description: null,
    })

    const { item } = registerItemResponse.body

    const registerInventoryTransaction = await request(app.server).post(`/inventory/${item.id}/transactions`).send({
      quantity: 1,
      operator: 'operator-name',
      transaction_type: 'insert',
    })

    const updatedItem = await prisma.inventory.findUnique({ where: { id: item.id } })

    expect(registerInventoryTransaction.status).toEqual(201)
    expect(updatedItem?.quantity).toEqual(11)
  })
})
