import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe.only('Register License (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register license correctly', async () => {
    const response = await request(app.server)
      .post('/licenses')
      .send({
        description: 'Microsoft 365',
        initAt: new Date('2023, 01, 01'),
        expiresAt: new Date('2024, 01, 01'),
        price: {
          value: 80,
          currency: 'BRL',
        },
        obs: null,
      })

    expect(response.status).toBe(201)
    expect(response.body.license).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        description: 'Microsoft 365',
        initAt: new Date('2023, 01, 01').toISOString(),
        expiresAt: new Date('2024, 01, 01').toISOString(),
        price: expect.objectContaining({
          value: 80,
          currency: 'BRL',
        }),
        obs: null,
      }),
    )
  })
})
