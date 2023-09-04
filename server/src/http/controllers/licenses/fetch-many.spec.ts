import { app } from '@/app'
import { createLicense } from '@/utils/tests/create-licenses'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch Many Licenses (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch many licenses', async () => {
    for (let i = 0; i < 5; i++) {
      await createLicense()
    }

    const response = await request(app.server).get('/licenses').send()

    expect(response.status).toBe(200)
    expect(response.body.licenses).toHaveLength(5)
  })
})
