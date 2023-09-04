import { app } from '@/app'
import { createPrinter } from '@/utils/tests/create-printer'
import { createPrinterInk } from '@/utils/tests/create-printer-ink'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Fetch Ink Stock (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch ink stock', async () => {
    for (let i = 0; i < 5; i++) {
      await createPrinterInk()
    }

    const response = await request(app.server).get('/ink-stock').send()

    expect(response.status).toBe(200)
    expect(response.body.inkStock).toHaveLength(5)
  })

  it('should be able to fetch ink stock by printer', async () => {
    const { id: printerId } = await createPrinter()

    for (let i = 0; i < 5; i++) {
      await createPrinterInk()
    }

    for (let i = 0; i < 3; i++) {
      await prisma.printerInkStock.create({
        data: {
          name: `ink ${i}`,
          quantity: 10,
          printer_id: printerId,
        },
      })
    }

    const response = await request(app.server).get(`/ink-stock?printer=${printerId}`).send()

    expect(response.status).toBe(200)
    expect(response.body.inkStock).toHaveLength(3)
  })
})
