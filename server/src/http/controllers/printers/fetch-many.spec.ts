import { app } from '@/app'
import { createPrinter } from '@/utils/tests/create-printer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Fetch Many Printers (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch many printers', async () => {
    for (let i = 0; i < 5; i++) {
      await createPrinter()
    }

    const response = await request(app.server).get('/printers').send()

    expect(response.status).toBe(200)
    expect(response.body.printers).toHaveLength(5)
  })
})
