import { app } from '@/app'
import { createPrinterInk } from '@/utils/tests/create-printer-ink'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Save Ink (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to save ink', async () => {
    const { id: inkId } = await createPrinterInk()

    const response = await request(app.server).patch(`/ink-stock/${inkId}`).send({
      name: 'blue ink',
    })

    expect(response.status).toBe(200)
    expect(response.body.ink).toEqual(
      expect.objectContaining({
        id: inkId,
        quantity: 10,
        name: 'blue ink',
        printer: expect.any(Object),
      }),
    )
  })
})
