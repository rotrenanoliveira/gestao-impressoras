import { app } from '@/app'
import { createLicense } from '@/utils/tests/create-licenses'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Get License By ID (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get license by id', async () => {
    const { id: licenseId } = await createLicense()

    const response = await request(app.server).get(`/licenses/${licenseId}`).send()

    expect(response.status).toBe(200)
    expect(response.body.license).toEqual(
      expect.objectContaining({
        id: licenseId,
        description: 'Microsoft 365',
        initAt: new Date('2023, 01,01').toISOString(),
        expiresAt: new Date('2024, 01,01').toISOString(),
        price: expect.objectContaining({
          value: 80,
          currency: 'BRL',
        }),
        obs: null,
      }),
    )
  })
})
