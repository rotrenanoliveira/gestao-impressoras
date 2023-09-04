import { app } from '@/app'
import { createPrinterInk } from '@/utils/tests/create-printer-ink'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Get Ink By ID (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get ink by id', async () => {
    const { id: inkId, printer } = await createPrinterInk()

    const response = await request(app.server).get(`/ink-stock/${inkId}`).send()

    expect(response.status).toBe(200)
    expect(response.body.ink).toEqual(
      expect.objectContaining({
        id: inkId,
        name: 'black ink',
        quantity: 10,
        printer: expect.objectContaining({
          id: printer.id,
          name: printer.name,
        }),
      }),
    )
  })
})
