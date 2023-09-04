import { app } from '@/app'
import { createComputer } from '@/utils/tests/create-computer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch Many Computers (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch many computers', async () => {
    for (let i = 0; i < 5; i++) {
      await createComputer()
    }

    const response = await request(app.server).get('/computers').send()

    expect(response.status).toBe(200)
    expect(response.body.computers).toHaveLength(5)
  })
})
