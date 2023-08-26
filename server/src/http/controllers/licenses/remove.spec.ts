import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createLicense } from '@/utils/tests/create-licenses'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Remove license (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove license', async () => {
    const { id: licenseId } = await createLicense()

    const response = await request(app.server).delete(`/licenses/${licenseId}`).send()

    expect(response.status).toBe(204)

    expect(await prisma.license.findMany()).toHaveLength(0)
  })
})
