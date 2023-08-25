import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createComputer } from '@/utils/create-computer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Remove Computer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove computer', async () => {
    const { id: computerId } = await createComputer()

    const response = await request(app.server).delete(`/computers/${computerId}`).send()

    expect(response.status).toBe(204)

    expect(await prisma.device.findMany()).toHaveLength(0)
    expect(await prisma.computer.findMany()).toHaveLength(0)
  })
})
