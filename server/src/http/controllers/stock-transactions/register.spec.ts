import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createPrinterInk } from '@/utils/tests/create-printer-ink'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register printer ink stock transaction (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register insert transaction type to printer ink stock', async () => {
    const STANDARD_INSERT_QUANTITY = 1
    const ink = await createPrinterInk()

    const response = await request(app.server).post('/stock-transactions').send({
      inkId: ink.id,
      operator: 'john doe',
      transaction: 'insert',
    })

    expect(response.status).toBe(201)
    expect(response.body.transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        type: 'insert',
        operator: 'john doe',
        ink: expect.objectContaining({
          id: ink.id,
          name: 'black ink',
        }),
      }),
    )

    const printerInk = await prisma.printerInkInfo.findUniqueOrThrow({
      where: { id: ink.id },
    })

    expect(printerInk.quantity).toEqual(ink.quantity + STANDARD_INSERT_QUANTITY)
  })

  it('should be able to register remove transaction type to printer ink stock', async () => {
    const STANDARD_REMOVE_QUANTITY = 1
    const ink = await createPrinterInk()

    const response = await request(app.server).post('/stock-transactions').send({
      inkId: ink.id,
      operator: 'john doe',
      transaction: 'remove',
    })

    expect(response.status).toBe(201)
    expect(response.body.transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        type: 'remove',
        operator: 'john doe',
        ink: expect.objectContaining({
          id: ink.id,
          name: 'black ink',
        }),
      }),
    )

    const printerInk = await prisma.printerInkInfo.findUniqueOrThrow({
      where: { id: ink.id },
    })

    expect(printerInk.quantity).toEqual(ink.quantity - STANDARD_REMOVE_QUANTITY)
  })
})
