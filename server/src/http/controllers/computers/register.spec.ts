import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe.only('Register Computer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register computer correctly', async () => {
    const response = await request(app.server)
      .post('/computers')
      .send({
        name: 'notebook',
        usedBy: 'john doe',
        department: 'it',
        specs: {
          so: 'windows 11',
          ram: '16GB',
          office: 'microsoft 365',
          hostname: 'notebook.domain.local',
          processor: 'intel core i7',
          storage: {
            type: 'SSD',
            capacity: 1024,
          },
        },
      })

    expect(response.status).toBe(201)
    expect(response.body.computer).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        specs: expect.any(Object),
        deviceId: expect.any(String),
        usedBy: 'john doe',
        name: 'notebook',
        status: 'ok',
      }),
    )
  })
})
