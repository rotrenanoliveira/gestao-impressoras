import { app } from '@/app'
import { createPrinter } from '@/utils/tests/create-printer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Get Printer By ID (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get printer by id', async () => {
    const { id: printerId, device_id: deviceId } = await createPrinter()

    const response = await request(app.server).get(`/printers/${printerId}`).send()

    expect(response.status).toBe(200)
    expect(response.body.printer).toEqual(
      expect.objectContaining({
        id: printerId,
        deviceId: deviceId,
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
