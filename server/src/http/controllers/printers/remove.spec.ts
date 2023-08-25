import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createPrinter } from '@/utils/tests/create-printer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Remove printer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove printer', async () => {
    const { id: printerId } = await createPrinter()

    const response = await request(app.server).delete(`/printers/${printerId}`).send()

    expect(response.status).toBe(204)

    expect(await prisma.device.findMany()).toHaveLength(0)
    expect(await prisma.printer.findMany()).toHaveLength(0)
  })
})
