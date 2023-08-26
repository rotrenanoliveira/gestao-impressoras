import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createPrinterInk } from '@/utils/tests/create-printer-ink'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Remove Ink (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove printer ink', async () => {
    const { id: inkId } = await createPrinterInk()

    const response = await request(app.server).delete(`/ink-stock/${inkId}`).send()

    expect(response.status).toBe(204)

    expect(await prisma.printerInkStock.findMany()).toHaveLength(0)
  })
})
