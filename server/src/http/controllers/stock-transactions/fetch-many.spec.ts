import { app } from '@/app'
import { createInkStockTransaction } from '@/utils/tests/create-ink-stock-transaction'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch printer ink stock transactions (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all printer ink stock transactions', async () => {
    for (let i = 0; i < 10; i++) {
      const transactionType = i % 2 === 0 ? 'insert' : 'remove'
      await createInkStockTransaction(transactionType)
    }

    const response = await request(app.server).get('/stock-transactions').send()

    expect(response.status).toBe(200)
    expect(response.body.transactions).toHaveLength(10)
  })
})
