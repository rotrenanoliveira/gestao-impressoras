import { app } from '@/app'
import { createPrinter } from '@/utils/tests/create-printer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe.only('Register Ink (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register ink correctly', async () => {
    const { id: printerId } = await createPrinter()

    const response = await request(app.server).post('/ink-stock').send({
      name: 'black ink',
      quantity: 1,
      printerId: printerId,
    })

    expect(response.status).toBe(201)
    expect(response.body.ink).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        quantity: 1,
        name: 'black ink',
        printer: expect.objectContaining({
          id: printerId,
          name: 'epson',
        }),
      }),
    )
  })
})
