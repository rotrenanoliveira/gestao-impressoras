import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe.only('Register Printer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register printer correctly', async () => {
    const response = await request(app.server)
      .post('/printers')
      .send({
        ip: '0.0.0.1',
        department: 'it',
        name: 'epson',
        rentedIn: new Date('2023, 01,01'),
        expiresAt: new Date('2024, 01,01'),
        obs: null,
      })

    expect(response.status).toBe(201)
    expect(response.body.printer).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        deviceId: expect.any(String),
        status: 'ok',
        ip: '0.0.0.1',
        name: 'epson',
        department: 'it',
        rentedIn: new Date('2023, 01,01').toISOString(),
        expiresAt: new Date('2024, 01,01').toISOString(),
        obs: null,
      }),
    )
  })
})
