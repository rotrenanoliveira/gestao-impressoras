import { app } from '@/app'
import { createLicense } from '@/utils/tests/create-licenses'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Save License (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to save license', async () => {
    const { id: licenseId } = await createLicense()

    const response = await request(app.server)
      .put(`/licenses/${licenseId}`)
      .send({
        description: 'Office 365',
        obs: 'Microsoft partner',
        price: {
          value: 12.5,
          currency: 'USD',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.license).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        description: 'Office 365',
        obs: 'Microsoft partner',
        price: expect.objectContaining({
          value: 12.5,
          currency: 'USD',
        }),
      }),
    )
  })
})
